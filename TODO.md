* Is there a YAML lint extension the end user can add?  I know YAML support by Red Hat is there.. 
Test these a bit and put a solution so users don't have issues... 
Add to exercise 1.1 (and anywhere else we're committing yaml)

* Is there a better differentiation for defaults/vars than what I have in exercise 1.5?  Not certain I'm happy with what's there...

* Update network design so workstation is the single point of entry.  All other IPs could then be on private subnet.  

* Refactor manage-ec2-instances.  Really repetitive... Maybe the role should provision X hosts for X role.  And then be run 4 times with different inputs? 

* Should we show differences between kerberos and credssp auth? 

* Every time we run the gitlab post config role it is going to reset the admin/root user.  We should find a way around that... 

Advanced Labs / Use Cases: 
* DSC Modules - and what they can do (maybe combined with ci/cd example?)
* Example of self-service app teams?  Allowing them to stop/start services.... Stop/start servers... 
   -> Showing RBAC by using restricted 'ops#' user who can only execute against a small subset of hosts using a specific playbook
* CI/CD Lab? https://docs.microsoft.com/en-us/powershell/dsc/dsccicd?

