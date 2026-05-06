import { Chrome, Facebook, LoaderCircle, Twitter } from 'lucide-react'
import { oauthProviders } from '../lib/auth'

const providerIcons = {
  facebook: Facebook,
  google: Chrome,
  twitter: Twitter,
}

const OAuthButtons = ({ activeProvider, onLogin, stacked = false }) => (
  <div className={`grid gap-3 ${stacked ? '' : 'sm:grid-cols-3'}`}>
    {oauthProviders.map((provider) => {
      const ProviderIcon = providerIcons[provider.id] ?? Chrome
      const isBusy = activeProvider === provider.id

      return (
        <button
          key={provider.id}
          className="btn-secondary w-full justify-center"
          disabled={isBusy}
          type="button"
          onClick={() => onLogin(provider.id)}
        >
          {isBusy ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <ProviderIcon className="h-4 w-4" />
          )}
          Entrar com {provider.label}
        </button>
      )
    })}
  </div>
)

export default OAuthButtons
