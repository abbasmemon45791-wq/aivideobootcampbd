$body = @{
    name = "Test User"
    email = "test@test.com"
    whatsapp = "03001234567"
    city = "Dhaka"
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Method POST -Uri 'http://localhost:3000/api/leads' -ContentType 'application/json' -Body $body
    Write-Host "SUCCESS:" ($result | ConvertTo-Json)
} catch {
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    $body = $reader.ReadToEnd()
    Write-Host "ERROR:" $body
}
