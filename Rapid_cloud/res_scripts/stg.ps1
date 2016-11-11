$Username = "test@rapiddirectory.onmicrosoft.com"
$Password = "Boron12#4"
$SecPassword = Convertto-SecureString -String $password -AsPlainText -Force
$Credential = New-object System.management.Automation.PSCredential $Username, $SecPassword

Add-AzureRmAccount -Credential $Credential

$vm = Get-AzureRmVM -ResourceGroupName "TestRG1" -Name "rapid"
Write-Host $vm

Add-AzureRmVMDataDisk -VM $vm -Name "disk3" -VhdUri "http://mystgaa.blob.core.windows.net/vhds/test2.vhd" -LUN 1 -Caching ReadOnly -DiskSizeinGB 1 -CreateOption Empty;

Update-AzureRmVM -ResourceGroupName "TestRG1" -VM $vm