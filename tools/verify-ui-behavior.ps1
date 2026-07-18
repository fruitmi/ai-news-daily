$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$indexHtml = Get-Content -LiteralPath (Join-Path $projectRoot 'index.html') -Raw -Encoding UTF8
$articleHtml = Get-Content -LiteralPath (Join-Path $projectRoot 'article.html') -Raw -Encoding UTF8
$failures = [System.Collections.Generic.List[string]]::new()

function Test-UiRequirement {
  param(
    [Parameter(Mandatory)] [string] $Label,
    [Parameter(Mandatory)] [bool] $Passed
  )

  if ($Passed) {
    Write-Output "PASS $Label"
    return
  }

  Write-Output "FAIL $Label"
  $failures.Add($Label)
}

Test-UiRequirement 'Homepage has a Banner scroll button' ($indexHtml -match 'data-scroll-to-articles')
Test-UiRequirement 'Homepage defines first-article scrolling' ($indexHtml -match 'function\s+scrollToFirstArticle\s*\(')
Test-UiRequirement 'Pagination invokes first-article scrolling' ([regex]::Matches($indexHtml, 'scrollToFirstArticle\(\);').Count -ge 3)
Test-UiRequirement 'Homepage respects reduced motion' (($indexHtml -match 'prefers-reduced-motion:\s*reduce') -and ($indexHtml -match 'behavior:\s*reduceMotion\s*\?'))
Test-UiRequirement 'Article page defines image resolution' ($articleHtml -match 'function\s+getArticleImageUrl\s*\(')
Test-UiRequirement 'Article page derives dated TOP3 images' ($articleHtml -match 'featured-\$\{item\.publishedAt\}-\$\{String\(rank\)\.padStart\(2')
Test-UiRequirement 'Article image max width is 1000px' ($articleHtml -match '(?s)\.article-visual\s*\{.*?width:\s*min\(100%,\s*1000px\)')
Test-UiRequirement 'Article image is centered' ($articleHtml -match '(?s)\.article-visual\s*\{.*?margin-inline:\s*auto')
Test-UiRequirement 'Failed image hides its container' (($articleHtml -match 'data-article-image') -and ($articleHtml -match 'closest\("\.article-visual"\)[\s\S]*?hidden\s*=\s*true'))
Test-UiRequirement 'Global H1 has no max-width restriction' (-not ($articleHtml -match '(?s)h1\s*\{[^}]*max-width:\s*820px'))
Test-UiRequirement 'Article title uses moderate responsive size' ($articleHtml -match '(?s)\.article-page\s+\.detail-title\s*\{[^}]*font-size:\s*clamp\(1\.4rem,\s*3vw,\s*2\.25rem\)')
Test-UiRequirement 'Article page defines same-day adjacent navigation' (($articleHtml -match 'function\s+adjacentArticleMarkup\s*\(') -and ($articleHtml -match 'data-article-pagination'))
Test-UiRequirement 'Adjacent navigation contains no article titles' (-not ($articleHtml -match 'article-pagination-title'))
Test-UiRequirement 'Recommendations shuffle candidates' (($articleHtml -match 'function\s+shuffleItems\s*\(') -and ($articleHtml -match 'slice\(0,\s*5\)'))
Test-UiRequirement 'Recommendations validate images before rendering' (($articleHtml -match 'function\s+loadImage\s*\(') -and ($articleHtml -match 'await\s+loadImage\('))
Test-UiRequirement 'Recommendation carousel loads Swiper bundle' (($articleHtml -match 'swiper@14/swiper-bundle\.min\.css') -and ($articleHtml -match 'swiper@14/swiper-bundle\.min\.js'))
Test-UiRequirement 'Recommendation carousel uses Swiper structure' (($articleHtml -match 'class="recommendation-swiper swiper"') -and ($articleHtml -match 'class="swiper-wrapper"') -and ($articleHtml -match 'swiper-slide'))
Test-UiRequirement 'Recommendation carousel initializes Swiper' (($articleHtml -match 'new\s+Swiper\(') -and ($articleHtml -match 'slidesPerView:\s*1') -and ($articleHtml -match 'breakpoints:'))

if ($failures.Count -gt 0) {
  Write-Error "$($failures.Count) checks failed."
  exit 1
}

Write-Output 'All UI behavior checks passed.'
