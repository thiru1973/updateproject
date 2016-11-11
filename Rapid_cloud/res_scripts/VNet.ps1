$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "vnet"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.62:27017/$($dbName)")
$collection = $db[$collectionName]

#Write-Host $collection
$query = new-object MongoDB.Driver.QueryDocument("vn_id",1)
$results = $collection.FindOne($query)


$Username = "test@rapiddirectory.onmicrosoft.com"
$Password = "Boron12#4"
$SecPassword = Convertto-SecureString -String $password -AsPlainText -Force
$Credential = New-object System.management.Automation.PSCredential $Username, $SecPassword

Add-AzureRmAccount -Credential $Credential

<#New-AzureRmVirtualNetwork -ResourceGroupName TestRG1 -Name TestVNet `
    -AddressPrefix 192.168.0.0/16 -Location "West US"
	#>
$vnetName = "TestVNet"
$rgName = "TestRG1"
$locName = "West US"

$subnetName = "mysubnet"
$singleSubnet = New-AzureRmVirtualNetworkSubnetConfig -Name $subnetName -AddressPrefix 10.0.0.0/24
Write-Host $singleSubnet

$vnet = New-AzureRmVirtualNetwork -Name $vnetName -ResourceGroupName $rgName -Location $locName -AddressPrefix 10.0.0.0/16 -Subnet $singleSubnet

