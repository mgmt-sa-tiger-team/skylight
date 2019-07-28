![skylight](docs/lab_guide/images/skylight_logo_color.png)

# Ansible Windows Workshop

These ansible playbooks provision a lab on AWS for use in delivering a workshop focused on Windows.  This provisions the following:

* Base Infrastructure
  * A Microsoft Active Directory Server
  * A Gitlab server
  * A Documentation server
* Per-Student Infrastructure
  * An Ansible Tower control node
  * A Windows Workstation for interacting with the environment
  * A Windows Host(s) for running playbooks against

The client pre-requisite to use this workshop is simply to have an RDP client which can connect to the Windows Workstation.  If RDP is not allowed through a corporate firewall, a HTML5 RDP client is also running on each Workstation.  As the HTML5 client is fairly slow, it is recommended that students use normal RDP if at all possible.  All other activities will take place from that Workstation.  The Workstation has Visual Studio Code, Chrome, Putty, and Git for Windows.  

## Usage

### Basic Requirements
Requirements for running the provisioner will vary based upon your environment and where you are provisioning to.  The basic requirements are the following

* Ansible >= 2.6
* Various Python Modules
  * pywinrm
  * boto >= 1.7 and boto3 (for AWS Provisioning)
  * ansible[azure] (for Azure Provisioning)
  * requests
  * requests-credssp
  * sshpass (use brew to install if OSX)
* Ansible Tower License

### AWS

You will need to setup your AWS configuration and Credentials.  Note that a standard AWS account is limited to 20 ec2 instances, so update your quota in advance.  Also note that each student gets 3 machines.  Make certain your VPC is large enough.  

You can set it up like this. 

`~/.aws/config`
```
[default]
region = us-east-1
output = table
```

`~/.aws/credentials`
```
[default]
aws_access_key_id = <your ec2 access key>
aws_secret_access_key = <your ec2 secret key>
```

For security purposes, consider the usage of an [Amazon IAM user](https://docs.aws.amazon.com/rekognition/latest/dg/setting-up.html).

### General Config

Beyond that, the main thing that needs to be edited is the *vars/main.yml* file which contains the configuration details specific to your environment.  You should instead copy this file to *vars/custom.yml* and it will use that in place of the main.yml file.  It will check for the custom.yml file first, and use main.yml if its not found.  This ensure your settings are not overridden if you update git, and are not committed to git (this file is ignored).

For each workshop it is recommended that you utilize the custom.yml to maintain the majority of the non-changing settings, and then you can create a separate vars file (to be included in via `extravars`) with just the variables you need for the individual workshop.

```
## Example extra vars file 
instance_loc: ec2
name_prefix: "skylight"
user_count: 1
towerversion: 3.2.7
```


The main configurations to change are as follows:

DNS is available only in this environment.  The default is safe.  Set a domain admin password (that meets AD requirements).


```
# Needed for AD and windows client provision
domain_admin_password: "MyP@ssw0rd21"
```

Next we need to create user details.  First is the password set for all users.  This too needs to meet AD restrictions.

```
# Number of users and prefix for user name
users_password: "AnsibleWorkshop21#"

# Number of user labs to deploy
user_count: 2
```

That's it.  Easy, right ?!?   Now run it (it just executes on `localhost`):

```
ansible-playbook provision.yml
```

or if you are using separate var files for each workshop:
```
ansible-playbook provision.yml -e @vars/myworkshop.yml
```

It takes roughly one hour to provision an environment for a single student.  For multi student accounts, it is recommended you set the number of forks (in `ansible.cfg`) to the number of students.  The main reason is that it instructs Ansible to run all of the Tower installations in parallel.

```
[defaults]
...
forks = 100
```

### Workshops Directory
All inventories will be placed in a folder named `workshops/ansible` in your local directory executing the playbook. The folder contains the following files:
- A `student#-instances.txt` file for each student defines the configuration for the three student systems.
  - The student inventory is also placed on their Tower host as `/etc/ansible/hosts`.
- The `instructor-inventory.txt` defines the inventory for the entire workshop.
- The `skylight-ansible-private.pem` private allows you to connect to the instances over SSH.

## Connecting to the environment

The workshop has people connect through RDP to the workstation for their lab and then interact with other systems from there.  However, all systems are accessible publicly at the moment, so there is nothing stopping you from connecting directly.  

A `documents` server is created for the lab environment.  Once you run the provisioner, it will display information on how to reach this server.  The server itself hosts three items.
The lab guide is available at:
```
http://<IPADDRESS>/
```
The decks are located at:
```
http://<IPADDRESS>/decks/
```
When viewing the deck, you can bring up the speaker notes by pressing 's'

The User Signup page is located at:
```
http://<IPADDRESS>/users/
```
The users will access this page to receive their user account information.  All of these are also available internally via a shortcut on their desktop.

A student list / progress tracker is available for admins at
```
http://<IPADDRESS>/users/list.php
```
You are required to enter your Domain Admin password to login to see the list.

## Deleting the environment

Run the `teardown.yml` playbook to tear down the environment. The playbook deletes the instances, the VPCs, and any other resource that the installer creates.
It takes roughly five minutes for this playbook to run.

```
ansible-playbook teardown.yml
```

If you deployed more than one workshop, you can specify the one you would like to tear down by passing the environment file to the Ansible command:
```
ansible-playbook teardown.yml -e vars/AnsibleAutomatesDallas.yml
```

## Troubleshooting

The following describes some of the common issues when deploying the environment.

- **Missing variables**: if the `provision.yml` complains about missing variables, make sure to **copy** the `main.yml` to `custom.yml` instead of overriding the values of some of the variables in the file.

- **DNS issues between hosts**: If there are DNS issues between servers, it could be related to a misconfiguration of the Windows Domain controller. Settings are managed by the following three variables in the main configuration file:
  ```
  # Used by Active Directory and windows client provision
  dns_domain_name: "ansibleworkshop.com"
  dns_domain_name_short: "ansibleworkshop"
  ldap_basedn: "DC=ansibleworkshop,DC=com"
  ```
  If you decide to use another domain, make sure to update the **three** variables. The DN must match the DNS domain name. If the domain is not the same in the three variables, the domain controller will fail to properly resolve server DNS names in the environment.

- **Connection times out**: the installer sometimes times out during the execution of some of the tasks (this is indicated by a message of `Control master terminated unexpectedly. Shared connection closed`).  
  This would mostly happen during the `run the tower installer` task of the `ansible-tower` role and the `Copy lab guides to server` task of the `docs_setup` role.
  To trace the execution time for all of the tasks that the playbook invokes, update the `ansible.cfg` to add some callback plugins before deploying the environment.

  ```
  [defaults]
  ...
  callback_whitelist = profile_tasks, timer
  ```

  This allows you to get the execution time for the tasks. The following lists the tasks taking over a minute to run, potentially causing timeouts:

  ```
  docs_setup : Copy lab guides to server ---------------------------------------------- 494.22s
  ansible-tower : run the tower installer --------------------------------------------- 334.83s
  geerlingguy.gitlab : Install GitLab ------------------------------------------------- 179.26s
  docs_setup : Copy deck to server ---------------------------------------------------- 167.75s
  gitlab-postconfig : sleep 2 minute to allow root to initialize after password set --- 119.94s
  windows-ad-controller : Create DNS Domain ------------------------------------------- 101.71s
  windows-workstation : Install IIS and .Net 4.5 on Server ---------------------------- 100.57s
  windows-workstation : Install Visual Studio Code, Git, and Putty --------------------- 80.43s
  windows-ad-controller : Reboot if needed --------------------------------------------- 75.72s
  manage-ec2-instances : DomainController | Wait for WinRM to come up ------------------ 57.23s
  ```

  To prevent the closing of SSH connections, you can either update the `/etc/ssh/ssh_config` for system-wide changes or your `~/.ssh/config` with the following:

  ```
  Host *
    ServerAliveInterval 10
    ServerAliveCountMax 2
  ```

- **Missing WinRM Module**: If the installation of the Windows environment fails, make sure that you use the right version of the `python-winrm` package, which exists for both Python 2 and Python 3 versions. In Fedora, the `python-winrm` packages provides WinRM for Python 2 whereas `python3-winrm` provides WinRM for Python 3.

- **Breaking on a fork**: When deploying on MacOS Mojave, some will experience an error `TASK [Gathering Facts] ***************************************************************************************************************************************************************************************
objc[43678]: +[__NSPlaceholderDate initialize] may have been in progress in another thread when fork() was called. We cannot safely call it or ignore it in the fork() child process. Crashing instead. Set a breakpoint on objc_initializeAfterForkError to debug.
`
In most situations, this can be fixed by setting this environment variable in your shell before running the playbook:
`export OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES`
