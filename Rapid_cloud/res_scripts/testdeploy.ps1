$Username = "test@rapiddirectory.onmicrosoft.com"
$Password = "Boron12#4"
$SecPassword = Convertto-SecureString -String $password -AsPlainText -Force
$Credential = New-object System.management.Automation.PSCredential $Username, $SecPassword

Add-AzureRmAccount -Credential $Credential

$UName = "rapid"
$PWord = "Cloud@123"
$SPassword  = Convertto-SecureString -string $PWord -AsPlainText -Force
$Cred = New-object System.management.Automation.PSCredential $UName, $SPassword


$locName = "centralus"
$rgName = "mygroup2"
New-AzureRmResourceGroup -Name $rgName -Location $locName

$stName = "mystog"
Get-AzureRmStorageAccountNameAvailability $stName

$storageAcc = New-AzureRmStorageAccount -ResourceGroupName $rgName -Name $stName -SkuName "Standard_LRS" -Kind "Storage" -Location $locName
Write-Host $storageAcc

$subnetName = "mysubnet2"
$singleSubnet = New-AzureRmVirtualNetworkSubnetConfig -Name $subnetName -AddressPrefix 10.0.0.0/24
Write-Host $singleSubnet

$vnetName = "myvnet2"
$vnet = New-AzureRmVirtualNetwork -Name $vnetName -ResourceGroupName $rgName -Location $locName -AddressPrefix 10.0.0.0/16 -Subnet $singleSubnet
Write-Host $vnet.Subnets[0].Id

$ipName = "myIPaddress2"
$pip = New-AzureRmPublicIpAddress -Name $ipName -ResourceGroupName $rgName -Location $locName -AllocationMethod Dynamic
Write-Host $pip

$nicName = "mynic2"
$nic = New-AzureRmNetworkInterface -Name $nicName -ResourceGroupName $rgName -Location $locName -SubnetId $vnet.Subnets[0].Id -PublicIpAddressId $pip.Id
Write-Host $nic

$vmName = "myvm2"
$vm = New-AzureRmVMConfig -VMName $vmName -VMSize "Standard_D1"
Write-Host $vm

$compName = "myvm2"
$vm = Set-AzureRmVMOperatingSystem -VM $vm -Windows -ComputerName $compName -Credential $Cred -ProvisionVMAgent -EnableAutoUpdate
Write-Host $vm

$vm = Set-AzureRmVMSourceImage -VM $vm -PublisherName MicrosoftWindowsServer -Offer WindowsServer -Skus 2012-R2-Datacenter -Version "latest"
Write-Host $vm

$vm = Add-AzureRmVMNetworkInterface -VM $vm -Id $nic.Id
Write-Host $vm

$blobPath = "vhds/WindowsVMosDisk.vhd"
$osDiskUri = $storageAcc.PrimaryEndpoints.Blob.ToString() + $blobPath
Write-Host $osDiskUri

$diskName = "windowsvmosdisk"
$vm = Set-AzureRmVMOSDisk -VM $vm -Name $diskName -VhdUri $osDiskUri -CreateOption fromImage
Write-Host $vm

New-AzureRmVM -ResourceGroupName $rgName -Location $locName -VM $vm
