# PowerShell script to fix all versioned imports in UI components

$uiPath = "src/components/ui"

# Get all TypeScript and JavaScript files in the UI components directory
$files = Get-ChildItem -Path $uiPath -Include "*.tsx", "*.ts", "*.jsx", "*.js" -Recurse

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Fix @radix-ui imports with versions
    $content = $content -replace '@radix-ui/([^@"'']+)@[0-9]+\.[0-9]+\.[0-9]+', '@radix-ui/$1'
    
    # Fix class-variance-authority with version
    $content = $content -replace 'class-variance-authority@[0-9]+\.[0-9]+\.[0-9]+', 'class-variance-authority'
    
    # Fix lucide-react with version
    $content = $content -replace 'lucide-react@[0-9]+\.[0-9]+\.[0-9]+', 'lucide-react'
    
    # Write the updated content back to the file
    Set-Content -Path $file.FullName -Value $content -NoNewline
    
    Write-Host "Fixed imports in: $($file.Name)"
}

Write-Host "All import fixes completed!"