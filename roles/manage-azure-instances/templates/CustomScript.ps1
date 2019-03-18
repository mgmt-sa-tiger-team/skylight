netsh advfirewall set allprofiles state off
Get-ScheduledTask *ngen* | Disable-ScheduledTask
Invoke-WebRequest -Uri https://raw.githubusercontent.com/ansible/ansible/devel/examples/scripts/ConfigureRemotingForAnsible.ps1 -OutFile C:\ConfigureRemotingForAnsible.ps1
C:\ConfigureRemotingForAnsible.ps1 -ForceNewSSLCert -EnableCredSSP
