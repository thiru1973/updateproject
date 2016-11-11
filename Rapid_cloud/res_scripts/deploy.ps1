$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "deploy_resources"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.100:27017/$($dbName)")
$collection = $db[$collectionName]

$query = new-object MongoDB.Driver.QueryDocument("rs_id",1)
$results = $collection.FindOne($query)

$Username = $results[5]
$Password = $results[6]
$SecPassword = Convertto-SecureString -String $password -AsPlainText -Force
$Credential = New-object System.management.Automation.PSCredential $Username, $SecPassword

Add-AzureRmAccount -Credential $Credential

$UName = "rapid"
$PWord = "Cloud@123"
$SPassword  = Convertto-SecureString -string $PWord -AsPlainText -Force
$Cred = New-object System.management.Automation.PSCredential $UName, $SPassword

$locName = $results[8]
$rgName = $results[9]
$vnetName = $results[10]
$subnetName = $results[11]

$vnet1 = Get-AzureRmVirtualNetwork -Name $vnetName -ResourceGroupName $rgName

$stName = "mystog12"
Get-AzureRmStorageAccountNameAvailability $stName

$storageAcc = New-AzureRmStorageAccount -ResourceGroupName $rgName -Name $stName -SkuName "Standard_LRS" -Kind "Storage" -Location $locName
Write-Host $storageAcc


foreach ($result in $results["Instances"]) { 
    $vmsize =  $result["instName"]
	$os = $result["os"]
	$vmName = $result["roleName"]
	
	$ipName = "myIP"+$result["roleName"]
	$pip = New-AzureRmPublicIpAddress -Name $ipName -ResourceGroupName $rgName -Location $locName -AllocationMethod Dynamic
	Write-Host $pip.id
	
	$nicName = "nic"+$result["roleName"]
	$nic = New-AzureRmNetworkInterface -Name $nicName -ResourceGroupName $rgName -Location $locName -SubnetId $vnet1.Subnets[0].Id -PublicIpAddressId $pip.Id
	Write-Host $nic

	$vm = New-AzureRmVMConfig -VMName $vmName -VMSize $vmsize
	Write-Host $vm

	$vm = Set-AzureRmVMOperatingSystem -VM $vm -Windows -ComputerName $vmName -Credential $Cred -ProvisionVMAgent -EnableAutoUpdate
	Write-Host $vm

	$vm = Set-AzureRmVMSourceImage -VM $vm -PublisherName MicrosoftWindowsServer -Offer WindowsServer -Skus 2012-R2-Datacenter -Version "latest"
	Write-Host $vm

	$vm = Add-AzureRmVMNetworkInterface -VM $vm -Id $nic.Id
	Write-Host $vm

	$blobPath = "vhds/"+$result["roleName"]+".vhd"
	$osDiskUri = $storageAcc.PrimaryEndpoints.Blob.ToString() + $blobPath
	Write-Host $osDiskUri

	$diskName = $result["roleName"]
	$vm = Set-AzureRmVMOSDisk -VM $vm -Name $diskName -VhdUri $osDiskUri -CreateOption fromImage
	Write-Host $vm

	New-AzureRmVM -ResourceGroupName $rgName -Location $locName -VM $vm
}
<#
$locName = "centralus"
$rgName = "mygroup1"
New-AzureRmResourceGroup -Name $rgName -Location $locName

$stName = "mystog"
Get-AzureRmStorageAccountNameAvailability $stName

$storageAcc = New-AzureRmStorageAccount -ResourceGroupName $rgName -Name $stName -SkuName "Standard_LRS" -Kind "Storage" -Location $locName
Write-Host $storageAcc

$subnetName = "mysubnet1"
$singleSubnet = New-AzureRmVirtualNetworkSubnetConfig -Name $subnetName -AddressPrefix 10.0.0.0/24
Write-Host $singleSubnet

$vnetName = "myvnet1"
$vnet = New-AzureRmVirtualNetwork -Name $vnetName -ResourceGroupName $rgName -Location $locName -AddressPrefix 10.0.0.0/16 -Subnet $singleSubnet
Write-Host $vnet

$ipName = "myIPaddress1"
$pip = New-AzureRmPublicIpAddress -Name $ipName -ResourceGroupName $rgName -Location $locName -AllocationMethod Dynamic
Write-Host $pip

$nicName = "mynic1"
$nic = New-AzureRmNetworkInterface -Name $nicName -ResourceGroupName $rgName -Location $locName -SubnetId $vnet.Subnets[0].Id -PublicIpAddressId $pip.Id
Write-Host $nic

$vmName = "myvm1"
$vm = New-AzureRmVMConfig -VMName $vmName -VMSize "Standard_A1"
Write-Host $vm

$compName = "myvm1"
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
#>