To run this provisioner from an Azure Cloud Shell environment, these are the commands you will need to issue

```
virtualenv -p /usr/bin/python2.7 skylight-env
source skylight-env/bin/activate
pip install requests-credssp
pip install pywinrm[credssp]
pip install ansible
pip install packaging
pip install msrestazure
pip install ansible[azure]
pip install cryptography==2.4.2

git clone https://github.com/mgmt-sa-tiger-team/skylight.git
cd skylight/vars/
cp vars/main.yml vars/custom.yml

# ADD YOUR AZURE SETTINGS
vi vars/custom.yml

# ADD YOUR TOWER LICENSE
vi tower_license.json


# RUN THE PROVISIONER
ansible-playbook provision.yml -c paramiko
```

