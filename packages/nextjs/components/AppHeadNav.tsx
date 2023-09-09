import { ConnectButton } from "@rainbow-me/rainbowkit"
import Link from "next/link"

export const AppHeadNav = () => {

  return (
    <nav
      className="relative flex w-full items-center justify-between bg-[#000] py-4 sm:px-16 px-4"
      data-te-navbar-ref>
      <div className="flex w-full justify-between items-center">
        <div className="flex">
          <Link href="/" className="text-2xl sm:text-4xl mono uppercase base_bg font-bold">
            Metro
          </Link>
        </div>

        <button
          className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 md:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent3"
          aria-controls="navbarSupportedContent3"
          aria-expanded="false"
          aria-label="Toggle navigation">

          <span className="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7">
              <path
                fill-rule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </button>

        <div className="flex bg- items-center text-black gap-5 hidden sm:flex">

          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account
                &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');
              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    'style': {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <div className="!visible mt-2 hidden bg-[#15243B] py-3 px-3 rounded-2xl text-center block md:mt-0 md:!flex md:basis-auto hover:cursor-pointer"
                          id="navbarSupportedContent3"
                          onClick={openConnectModal}
                          data-te-collapse-item>

                          <div className="list-style-none mr-auto flex w-full flex-col pl-0 md:flex-row"
                            data-te-navbar-nav-ref>

                            <div
                              className="mb-4 pl-2 md:mb-0 md:pl-0 md:pr-1 mx-auto"
                              data-te-nav-item-ref>
                              <span
                                className="mono_font text-white text-xl text-center transition duration-200 hover:ease-in-out motion-reduce:transition-none md:px-2"
                                data-te-nav-link-ref>Connect Wallet</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    if (chain.unsupported) {
                      return (
                        <button onClick={openChainModal} type="button">
                          Wrong network
                        </button>
                      );
                    }
                    return (
                      <div style={{ display: 'flex', gap: 12 }} className="border rounded-2xl p-4 text-white">
                        <button
                          onClick={openChainModal}
                          style={{ display: 'flex', alignItems: 'center' }}
                          type="button"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
                                  src={chain.iconUrl}
                                  style={{ width: 12, height: 12 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name}
                        </button>
                        <button onClick={openAccountModal} type="button" className="text-white">
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ''}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
          {/* <ConnectButton className="bg-red-400" /> */}
        </div>

      </div>
    </nav>
  )
}