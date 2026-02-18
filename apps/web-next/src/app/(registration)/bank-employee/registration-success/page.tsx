export default function RegistrationSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-base-secondary p-8 rounded-lg text-center">
        <h1 className="text-2xl font-bold text-green-400 mb-4">Registration Successful!</h1>
        <p className="text-textTheme-secondary mb-6">
          Your bank employee registration has been submitted successfully.
        </p>
        <a
          href="/admin/login"
          className="bg-accent-primary text-base-primary px-6 py-2 rounded-lg hover:bg-accent-primaryActiveButton transition-colors inline-block"
        >
          Continue to Login
        </a>
      </div>
    </div>
  )
}
