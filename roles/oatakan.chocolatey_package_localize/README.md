# ansible-role-chocolatey_package_localize
Ansible role to localize chocolatey packages for Windows.

With the defaults this role will:

- Create c:\repo directory
- Set up SMB share giving access to Administrator user
- Download list of chocolately packages (.nupkg) locally

The following can also be configured as part of the role but require some
chocolate_packages with url variable to be set:

- For packages that depends on external binaries, you can provide url to download and repackage for local deployments.

```
    chocolatey_packages:
      - name: googlechrome
        version: 77.0.3865.120
        url: https://dl.google.com/tag/s/dl/chrome/install/googlechromestandaloneenterprise64.msi
```

> **_Note:_** This role is provided as an example only. Do not use this in production. You can fork/clone and add/remove steps for your environment based on your organization's security and operational requirements.


Requirements
------------

No special requirements. This role will run against a Windows server.

Role Variables
--------------

### Mandatory Variables

None, this role will run with the default options set.

### Default Variables
* `chocolatey_repo_folder`: Directory to create and to store local packages.
* `chocolatey_internalize_packages`: whether to download binaries and repackage (default: true).
* `chocolatey_setup_shared_repo`: whether to setup a simple to use a repository for the clients (default: true).
* `chocolatey_share_name`: The name of the SBM share for the repo (default: repo).
* `chocolatey_share_description`: The description of the SBM share for the repo (default: nuget repo).
* `chocolatey_share_full_access`: The group/user name to give full access to SMB share for the repo (default: Administrator).
* `chocolatey_share_read_access`: The group/user name to give read access to SMB share for the repo (default: Administrator).
* `chocolatey_packages`: The list of packages in dictionary format:

```
chocolatey_packages:
  - name: git.install
    version: 2.23.0
  - name: googlechrome
    version: 77.0.3865.120
    url: https://dl.google.com/tag/s/dl/chrome/install/googlechromestandaloneenterprise64.msi
```

### Example

Dependencies
------------

None

Example Playbook
----------------


```
- name: localize packages
  hosts: windows_server
  gather_facts: no
  roles:
    - oatakan.chocolatey_package_localize

- name: setup repo and install packages on clients
  hosts: windows_clients
  gather_facts: no
  tasks:
    - name: Add new internal source
      win_chocolatey_source:
        name: internal repo
        state: present
        source: '\\windows_server\repo'
        priority: 1
    
    - name: Install packages
      win_chocolatey:
        name: "{{ item }}"
      loop:
        - git.install
        - googlechrome
      vars:
        ansible_become: yes
        ansible_become_method: runas
        ansible_become_user: '{{ ansible_user }}'
        ansible_become_pass: '{{ ansible_password }}'
```

License
-------

MIT

Author Information
------------------

Orcun Atakan

