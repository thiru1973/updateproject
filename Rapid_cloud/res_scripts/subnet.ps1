$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "subnet"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.100:27017/$($dbName)")
$collection = $db[$collectionName]

$query = new-object MongoDB.Driver.QueryDocument("sn_id",1)
$results = $collection.FindOne($query)

$Username = $results[2]
$Password = $results[3]
$resName = $results[4]
$location = $results[5]
$vnetname = $results[6]
$addpfx = $results[7]
$confname = $results[8]

$SecPassword = Convertto-SecureString -String $password -AsPlainText -Force
$Credential = New-object System.management.Automation.PSCredential $Username, $SecPassword

Add-AzureRmAccount -Credential $Credential
Write-Host $addpfx
$vnet = Get-AzureRmVirtualNetwork -ResourceGroupName $resName -Name $vnetname
Add-AzureRmVirtualNetworkSubnetConfig -Name $confname -VirtualNetwork $vnet -AddressPrefix $addpfx
Set-AzureRmVirtualNetwork -VirtualNetwork $vnet

#New-AzureRmVirtualNetworkSubnetConfig -Name "GatewaySubnet" -AddressPrefix 10.0.0.0/24
