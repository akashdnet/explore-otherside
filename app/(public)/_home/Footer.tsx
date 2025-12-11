export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 py-8 px-4 w-full mx-auto ">
      <div className="md:max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-bold mb-3 text-slate-900 dark:text-slate-100">Company</h4>
          <ul className="space-y-2">
            <li>
              <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary" href="#">
                About
              </a>
            </li>
            <li>
              <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary" href="#">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-slate-900 dark:text-slate-100">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary" href="#">
                Privacy Policy
              </a>
            </li>
            <li>
              <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary" href="#">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <p className="text-sm text-slate-500 text-center pt-8">© 2025 Travel Buddy. All rights reserved.</p>
      </div>
    </footer>
  )
}