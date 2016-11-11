$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "routeTable"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.100:27017/$($dbName)")
$collection = $db[$collectionName]

#Write-Host $collection
$query = new-object MongoDB.Driver.QueryDocument("rt_id",1)
$results = $collection.FindOne($query)


$Username = $results[2]
$Password = $results[3]
$ResourceGroupName = $results[4]
$location = $results[5]
$vnetname = $results[6]
$routeTableName = $results[7]
$routeconf = $results[8]
$addprefix = $results[9]
$nextHop = $results[10]
$nextHopIp = $results[11]


$SecPassword = Convertto-SecureString -String $password -AsPlainText -Force
$Credential = New-object System.management.Automation.PSCredential $Username, $SecPassword

Add-AzureRmAccount -Credential $Credential

#$ResourceGroupName = "TestRG1"
#$Location = "West US"
#$routeTableName = "testroute"
#$$VNETName = "TestVNet"

$routeTable = New-AzureRmRouteTable -ResourceGroupName $ResourceGroupName -Location $location -Name $routeTableName

Add-AzureRmRouteConfig -Name $routeconf -AddressPrefix $addprefix -RouteTable $routeTable -NextHopType $nextHop -NextHopIpAddress $nextHopIp

$vnet = Get-AzureRmVirtualNetwork -ResourceGroupName $ResourceGroupName -Name $vnetname

Set-AzureRmVirtualNetwork -VirtualNetwork $vnet