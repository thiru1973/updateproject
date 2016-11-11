$Username = "test@rapiddirectory.onmicrosoft.com"
$Password = "Boron12#4"
$SecPassword = Convertto-SecureString -String $password -AsPlainText -Force
$Credential = New-object System.management.Automation.PSCredential $Username, $SecPassword

Add-AzureAccount -Credential $Credential