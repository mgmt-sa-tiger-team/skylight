$script = <<-SCRIPT
& $([scriptblock]::Create((New-Object Net.WebClient).DownloadString('https://raw.githubusercontent.com/ansible/ansible/devel/examples/scripts/ConfigureRemotingForAnsible.ps1'))) -ForceNewSSLCert -EnableCredSSP
SCRIPT

Vagrant.configure("2") do |config|
  # Define the number of nodes to start

  nid = 6

  gitlab_hostname= "gitlab"
  nid = (nid - 1)
  config.vm.define "#{gitlab_hostname}" do |node|
    node.vm.box = "centos/7"
    node.vm.hostname = "#{gitlab_hostname}"
    node.vm.boot_timeout = 600
    node.ssh.insert_key = false
    node.vm.network :private_network, ip: "10.0.1.4"

    node.vm.provider "virtualbox" do |vb, override|
      vb.gui = false
      vb.name = "#{gitlab_hostname}"
      vb.customize ["modifyvm", :id, "--memory", 3072]
      vb.customize ["modifyvm", :id, "--cpus", 2]
    end

    node.vm.provider "kvm" do |kvm, override|
      kvm.memory_size = "3072m"
    end

    node.vm.provider :libvirt do |libvirt, override|
      libvirt.memory = 3072
      libvirt.nested = true
    end

    node.vm.provider :vmware_desktop do |v, override|
      v.gui = false
      v.vmx["memsize"] = "3072"
      v.vmx["numvcpus"] = "2"
      v.vmx["ethernet0.virtualDev"] = "vmxnet3"
      v.vmx["RemoteDisplay.vnc.enabled"] = "false"
      v.vmx["RemoteDisplay.vnc.port"] = "5900"
      v.enable_vmrun_ip_lookup = false
    end
  end

  docs_hostname= "docs"
  nid = (nid - 1)
  config.vm.define "#{docs_hostname}" do |node|
    node.vm.box = "centos/7"
    node.vm.hostname = "#{docs_hostname}"
    node.vm.boot_timeout = 600
    node.ssh.insert_key = false
    node.vm.network "forwarded_port", guest: 80, host: 80
    node.vm.network :private_network, ip: "10.0.1.5"

    node.vm.provider "virtualbox" do |vb, override|
      vb.gui = false
      vb.name = "#{docs_hostname}"
      vb.customize ["modifyvm", :id, "--memory", 2048]
      vb.customize ["modifyvm", :id, "--cpus", 2]
    end

    node.vm.provider "kvm" do |kvm, override|
      kvm.memory_size = "2048m"
    end

    node.vm.provider :libvirt do |libvirt, override|
      libvirt.memory = 2048
      libvirt.nested = true
    end

    node.vm.provider :vmware_desktop do |v, override|
        v.gui = false
        v.vmx["memsize"] = "2048"
        v.vmx["numvcpus"] = "2"
        v.vmx["ethernet0.virtualDev"] = "vmxnet3"
        v.vmx["RemoteDisplay.vnc.enabled"] = "false"
        v.vmx["RemoteDisplay.vnc.port"] = "5900"
        v.enable_vmrun_ip_lookup = false
    end
  end

  windc_hostname= "windc"
  nid = (nid - 1)
  config.vm.define "#{windc_hostname}" do |node|
    node.vm.box = "oatakan/windows-2019-standard-core"
    node.vm.hostname = "#{windc_hostname}"
    node.vm.boot_timeout = 600
    node.winrm.transport = :negotiate
    node.vm.communicator = "winrm"
    node.winrm.basic_auth_only = false
    node.winrm.timeout = 300
    node.winrm.retry_limit = 20
    node.vm.network "forwarded_port", guest: 5986, host: 5902
    node.vm.network :private_network, ip: "10.0.1.6"
    node.vm.synced_folder ".", "/vagrant", disabled: true

    node.vm.provider "virtualbox" do |vb, override|
      vb.gui = false
      vb.name = "#{windc_hostname}"
      vb.default_nic_type = "82545EM"
      vb.customize ["modifyvm", :id, "--memory", 4096]
      vb.customize ["modifyvm", :id, "--cpus", 2]
      vb.customize ["modifyvm", :id, "--vram", "32"]
      vb.customize ["setextradata", "global", "GUI/SuppressMessages", "all" ]
    end

    node.vm.provider "kvm" do |kvm, override|
      kvm.memory_size = "4096m"
    end

    node.vm.provider :libvirt do |libvirt, override|
      libvirt.memory = 4096
      libvirt.nested = true
    end

    node.vm.provider :vmware_desktop do |v, override|
        v.gui = false
        v.vmx["memsize"] = "4096"
        v.vmx["numvcpus"] = "2"
        v.vmx["ethernet0.virtualDev"] = "vmxnet3"
        v.vmx["RemoteDisplay.vnc.enabled"] = "false"
        v.vmx["RemoteDisplay.vnc.port"] = "5900"
        v.vmx["scsi0.virtualDev"] = "lsisas1068"
        v.enable_vmrun_ip_lookup = false
    end
  end

  s1_tower_hostname= "s1-tower"
  nid = (nid - 1)
  config.vm.define "#{s1_tower_hostname}" do |node|
    node.vm.box = "centos/7"
    node.vm.hostname = "#{s1_tower_hostname}"
    node.vm.boot_timeout = 600
    node.ssh.insert_key = false
    node.vm.network :private_network, ip: "10.0.1.7"

    node.vm.provider "virtualbox" do |vb, override|
      vb.gui = false
      vb.name = "#{s1_tower_hostname}"
      vb.customize ["modifyvm", :id, "--memory", 4096]
      vb.customize ["modifyvm", :id, "--cpus", 2]
    end

    node.vm.provider "kvm" do |kvm, override|
      kvm.memory_size = "4096m"
    end

    node.vm.provider :libvirt do |libvirt, override|
      libvirt.memory = 4096
      libvirt.nested = true
    end

    node.vm.provider :vmware_desktop do |v, override|
        v.gui = false
        v.vmx["memsize"] = "4096"
        v.vmx["numvcpus"] = "2"
        v.vmx["ethernet0.virtualDev"] = "vmxnet3"
        v.vmx["RemoteDisplay.vnc.enabled"] = "false"
        v.vmx["RemoteDisplay.vnc.port"] = "5900"
        v.enable_vmrun_ip_lookup = false
    end
  end

  s1_win1_hostname= "s1-win1"
  nid = (nid - 1)
  config.vm.define "#{s1_win1_hostname}" do |node|
    node.vm.box = "oatakan/windows-2019-standard-core"
    node.vm.hostname = "#{s1_win1_hostname}"
    node.vm.boot_timeout = 600
    node.winrm.transport = :negotiate
    node.vm.communicator = "winrm"
    node.winrm.basic_auth_only = false
    node.winrm.timeout = 300
    node.winrm.retry_limit = 20
    node.vm.network "forwarded_port", guest: 5986, host: 5903, auto_correct: true
    node.vm.network :private_network, ip: "10.0.1.8"
    node.vm.synced_folder ".", "/vagrant", disabled: true

    node.vm.provider "virtualbox" do |vb, override|
      vb.gui = false
      vb.name = "#{s1_win1_hostname}"
      vb.default_nic_type = "82545EM"
      vb.customize ["modifyvm", :id, "--memory", 3072]
      vb.customize ["modifyvm", :id, "--cpus", 2]
      vb.customize ["modifyvm", :id, "--vram", "32"]
      vb.customize ["setextradata", "global", "GUI/SuppressMessages", "all" ]
    end

    node.vm.provider "kvm" do |kvm, override|
      kvm.memory_size = "3072m"
    end

    node.vm.provider :libvirt do |libvirt, override|
      libvirt.memory = 3072
      libvirt.nested = true
    end

    node.vm.provider :vmware_desktop do |v, override|
        v.gui = false
        v.vmx["memsize"] = "3072"
        v.vmx["numvcpus"] = "2"
        v.vmx["ethernet0.virtualDev"] = "vmxnet3"
        v.vmx["RemoteDisplay.vnc.enabled"] = "false"
        v.vmx["RemoteDisplay.vnc.port"] = "5900"
        v.vmx["scsi0.virtualDev"] = "lsisas1068"
        v.enable_vmrun_ip_lookup = false
    end
  end

  s1_work_hostname= "s1-work"
  nid = (nid - 1)
  config.vm.define "#{s1_work_hostname}" do |node|
    node.vm.box = "oatakan/windows-2019-standard"
    node.vm.hostname = "#{s1_work_hostname}"
    node.vm.boot_timeout = 600
    node.winrm.transport = :negotiate
    node.vm.communicator = "winrm"
    node.winrm.basic_auth_only = false
    node.winrm.timeout = 300
    node.winrm.retry_limit = 20
    node.vm.network "forwarded_port", guest: 3389, host: 13389, auto_correct: true
    node.vm.network "forwarded_port", guest: 5986, host: 5904, auto_correct: true
    node.vm.network :private_network, ip: "10.0.1.9"
    node.vm.synced_folder ".", "/vagrant", disabled: true

    node.vm.provider "virtualbox" do |vb, override|
      vb.gui = false
      vb.name = "#{s1_work_hostname}"
      vb.default_nic_type = "82545EM"
      vb.customize ["modifyvm", :id, "--memory", 3072]
      vb.customize ["modifyvm", :id, "--cpus", 2]
      vb.customize ["modifyvm", :id, "--vram", "32"]
      vb.customize ["setextradata", "global", "GUI/SuppressMessages", "all" ]
    end

    node.vm.provider "kvm" do |kvm, override|
      kvm.memory_size = "3072m"
    end

    node.vm.provider :libvirt do |libvirt, override|
      libvirt.memory = 3072
      libvirt.nested = true
    end

    node.vm.provider :vmware_desktop do |v, override|
        v.gui = false
        v.vmx["memsize"] = "3072"
        v.vmx["numvcpus"] = "2"
        v.vmx["ethernet0.virtualDev"] = "vmxnet3"
        v.vmx["RemoteDisplay.vnc.enabled"] = "false"
        v.vmx["RemoteDisplay.vnc.port"] = "5900"
        v.vmx["scsi0.virtualDev"] = "lsisas1068"
        v.enable_vmrun_ip_lookup = false
    end

    if Vagrant::Util::Platform.windows?
      config.vm.provision "shell", inline: $script
    end

    if nid == 0
      node.vm.provision "ansible" do |ansible|
        ansible.limit = "all,localhost"
        ansible.playbook = "provision.yml"
        ansible.config_file = "ansible.cfg"
        ansible.compatibility_mode = "2.0"
        ansible.host_vars = {
          "gitlab" => {"private_ip" => "10.0.1.4"},
          "docs" => {"private_ip" => "10.0.1.5"},
          "windc" => {"private_ip" => "10.0.1.6"},
          "s1-tower" => {"private_ip" => "10.0.1.7"},
          "s1-win1" => {"private_ip" => "10.0.1.8"},
          "s1-work" => {"private_ip" => "10.0.1.9"}
        }
        ansible.groups = {

          "all:vars" => { "ansible_winrm_scheme" => "http" }
        }
        ansible.extra_vars = {
          instance_loc: "vagrant",
          user_count: 1,
          user_prefix: "student",
          root_user: "vagrant",
          root_password: "vagrant",
          name_prefix: "vg"
        }
      end
    end
  end
end