

$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "Endpoints"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.62:27017/$($dbName)")
$collection = $db[$collectionName]

#Write-Host $collection
$query = new-object MongoDB.Driver.QueryDocument("ep_id",1)
$results = $collection.FindOne($query)
$Cloud_Service = $results[2]
$VMName = $results[3]
$EpName = $results[4]
$LocalPort = $results[5]
$PublicPort = $results[6]

#Write-Host $Cloud_Service,$VMName,$EpName,$LocalPort,$PublicPort

$Subscriptions = Get-AzureSubscription

Get-AzureVM -ServiceName $Cloud_Service -Name $VMName | 
Add-AzureEndpoint -Name $EpName -LocalPort $LocalPort `
-PublicPort $PublicPort -Protocol tcp |
Update-AzureVM

Write-Host "End point is created"