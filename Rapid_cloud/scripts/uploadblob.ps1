$mongoDbDriverPath = "C:\mongo\"
$dbName = "test"
$collectionName = "blobupload"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Bson.dll"
Add-Type -Path "$($mongoDbDriverPath)\MongoDB.Driver.dll"
$db = [MongoDB.Driver.MongoDatabase]::Create("mongodb://172.29.59.62:27017/$($dbName)")
$collection = $db[$collectionName]

#Write-Host $collection
$query = new-object MongoDB.Driver.QueryDocument("bb_id",1)
$results = $collection.FindOne($query)
Write-Host $results

$StorageAccount = $results[2]#'mybelgaumservice'

$StorageKey = (Get-AzureStorageKey `
-StorageAccountName $StorageAccount).Primary
$ContainerName = $results[3]
$BlobName =$results[4]
$LocalFileDirectory = $results[5]#'C:\Users\sangamesh.b\Downloads\ScriptstoShwetha\ScriptstoShwetha\Local to Azure Blob Copy\Upload Blob to Azure v1.1.ps1.txt'

Write-Host $LocalFileDirectory
$Subscriptions = Get-AzureSubscription


Set-AzureSubscription -CurrentStorageAccountName $StorageAccount -SubscriptionName 'Rapid Cloud'

$StorageAccountContext = New-AzureStorageContext -StorageAccountName $StorageAccount -StorageAccountKey $StorageKey

New-AzureStorageContainer -Name $ContainerName -Permission Off

$StorageAccountContext = New-AzureStorageContext -StorageAccountName $StorageAccount -StorageAccountKey $StorageKey

$LocalFile = $LocalFileDirectory 

Set-AzureStorageBlobContent -File $Localfile -Container $ContainerName -Blob $BlobName -Context $StorageAccountContext -BlobType Block

Write-Host $StorageKey