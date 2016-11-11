$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "localNwGway"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.100:27017/$($dbName)")
$collection = $db[$collectionName]

#Write-Host $collection
$query = new-object MongoDB.Driver.QueryDocument("gt_id",1)
$results = $collection.FindOne($query)

#Write-Host $results[2]

$Username = $results[2]
$Password = $results[3]
$resName = $results[4]
$location = $results[5]
$gwName = $results[6]
$gwAddress = $results[7]
$addPrefix = $results[8]


$SecPassword = Convertto-SecureString -String $password -AsPlainText -Force
$Credential = New-object System.management.Automation.PSCredential $Username, $SecPassword

Add-AzureRmAccount -Credential $Credential

New-AzureRmLocalNetworkGateway -Name $gwName -ResourceGroupName $resName -Location $location -GatewayIpAddress $gwAddress -AddressPrefix $addPrefix