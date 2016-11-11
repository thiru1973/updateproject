$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "createVnetGWay"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.100:27017/$($dbName)")
$collection = $db[$collectionName]

#Write-Host $collection
$query = new-object MongoDB.Driver.QueryDocument("gw_id",1)
$results = $collection.FindOne($query)

#Write-Host $results[2]

$Username = $results[2]
$Password = $results[3]
$resName = $results[4]
$location = $results[5]
$pipName = $results[6]
$alMethod= $results[7]
$vnetName = $results[8]
$snetName = $results[9]
$gwType = $results[10]
$VpnType= $results[11]
$gwSku = $results[12]

$SecPassword = Convertto-SecureString -String $password -AsPlainText -Force
$Credential = New-object System.management.Automation.PSCredential $Username, $SecPassword

Add-AzureRmAccount -Credential $Credential

$gwpip1 = New-AzureRmPublicIpAddress -Name $pipName -ResourceGroupName $resName -Location $location -AllocationMethod $alMethod

$vnet1     = Get-AzureRmVirtualNetwork -Name $vnetName -ResourceGroupName $resName
$subnet1   = Get-AzureRmVirtualNetworkSubnetConfig -Name $snetName -VirtualNetwork $vnet1
$gwipconf1 = New-AzureRmVirtualNetworkGatewayIpConfig -Name "gwipconf1" -Subnet $subnet1 -PublicIpAddress $gwpip1

New-AzureRmVirtualNetworkGateway -Name "ySubnet" -ResourceGroupName $resName -Location $location -IpConfigurations $gwipconf1 -GatewayType $gwType -VpnType $VpnType -GatewaySku $gwSku

Write-Host "Virtual network gateway is created"	