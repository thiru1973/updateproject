$computer = "testax"
$user = "azureuser"
$password = "sonata@123"
$securepassword = ConvertTo-SecureString -String $password -AsPlainText -Force
$cred = New-Object -TypeName System.Management.Automation.PSCredential -ArgumentList $user, $securepassword
Invoke-Command -ComputerName $computer -ScriptBlock { Copy-Item -Path C:\\Users\\anurag.s\\Desktop\\prerequisites -Destination C:\Users\azureuser\Downloads } -Credential $cred 