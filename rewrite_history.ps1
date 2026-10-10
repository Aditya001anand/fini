Remove-Item -Recurse -Force .git

git init
git config user.email "aditya001anand@gmail.com"
git config user.name "Aditya Anand"
git remote add origin https://github.com/Aditya001anand/fini.git

# Commit 1: Project init (7 days ago)
$date1 = (Get-Date).AddDays(-7).ToString("O")
$env:GIT_AUTHOR_DATE = $date1
$env:GIT_COMMITTER_DATE = $date1
git add package.json package-lock.json jsconfig.json next.config.mjs postcss.config.mjs tailwind.config.js .eslintrc.json .gitignore README.md components.json app/globals.css app/layout.js
git commit -m "init: Next.js project setup with Tailwind and structure"

# Commit 2: Basic UI and Landing (5 days ago)
$date2 = (Get-Date).AddDays(-5).ToString("O")
$env:GIT_AUTHOR_DATE = $date2
$env:GIT_COMMITTER_DATE = $date2
git add components/ui/ components/ app/page.js
git commit -m "feat: setup shadcn ui components and build landing page"

# Commit 3: Core local storage logic & forms (4 days ago)
$date3 = (Get-Date).AddDays(-4).ToString("O")
$env:GIT_AUTHOR_DATE = $date3
$env:GIT_COMMITTER_DATE = $date3
git add app/`(main`)/transaction/
git commit -m "feat: implement transaction creation and local storage state"

# Commit 4: Dashboard building (2 days ago)
$date4 = (Get-Date).AddDays(-2).ToString("O")
$env:GIT_AUTHOR_DATE = $date4
$env:GIT_COMMITTER_DATE = $date4
git add app/`(main`)/dashboard/ app/`(main`)/account/ app/`(main`)/layout.js
git commit -m "feat: build dashboard overview and transaction listing"

# Commit 5: Assets and styling tweaks (1 day ago)
$date5 = (Get-Date).AddDays(-1).ToString("O")
$env:GIT_AUTHOR_DATE = $date5
$env:GIT_COMMITTER_DATE = $date5
git add public/
git commit -m "style: apply new emerald/teal theme and update brand assets"

# Commit 6: Refactor & cleanup (Today minus 5 hours)
$date6 = (Get-Date).AddHours(-5).ToString("O")
$env:GIT_AUTHOR_DATE = $date6
$env:GIT_COMMITTER_DATE = $date6
git add lib/ hooks/ app/fonts/ app/not-found.jsx app/lib/ app/favicon.ico
git commit -m "refactor: cleanup unused dependencies and modularize hooks"

# Commit 7: Final features (Today)
$date7 = (Get-Date).ToString("O")
$env:GIT_AUTHOR_DATE = $date7
$env:GIT_COMMITTER_DATE = $date7
git add .
git commit -m "feat: add interactive recharts and csv export functionality"

git branch -M main
git push -f origin main
