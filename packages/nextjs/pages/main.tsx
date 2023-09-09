/* eslint-disable @typescript-eslint/ban-types */

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AppHeadNav } from "../components/AppHeadNav";
import { GlobalContext } from "../context/GlobalContext";
import metroABI from "../utils/utils/childContractAbi.json";
import FactoryABI from "../utils/utils/factoryAbi.json";
import { coins, companies, companyName } from "../utils/utils/utils";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import MoonLoader from "react-spinners/MoonLoader";
import { parseEther, parseUnits } from "viem";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useDisconnect,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

interface Coin {
  symbol: string;
  icon: HTMLImageElement | String | any;
  key: number;
}

const BuyUnits = () => {
  const [swapMessage, setSwapMessage] = useState("Recharge");
  const [currentSwap, setCurrentSwap] = useState(true);
  const { isConnected, address } = useAccount();

  const { data, isError, isLoading } = useBalance({
    address: address,
  });

  const [showFirstCoin, setShowFirstCoin] = useState(false);
  const [showSecondCoin, setShowSecondCoin] = useState(false);

  const [active, setActive] = useState("IBEDC");

  const [initialFirstCoin, setInitialFirstCoin] = useState<Coin>(coins[0]);
  const [initialSecondCoin, setInitialSecondCoin] = useState<Coin>(coins[1]);

  const [accountBalance, setAccountBalance] = useState("");
  const [balanceERC20, setBalanceERC20] = useState("");
  const { state, dispatch } = useContext(GlobalContext);

  const [input1, setInput1] = useState<number>(0);
  const [input2, setInput2] = useState<number>(0);
  const [input3, setInput3] = useState<number>();

  const [firstCoin, setSelectedCoin] = useState<number>();
  const [secondCoin, setSelectSecondCoin] = useState<number>();

  const [value1, setValue1] = useState<number>();
  const [value2, setValue2] = useState<number>();

  const value3: number = input1 * 0.05 ?? 0;

  useEffect(() => {
    dispatch({
      type: "SET_CONNECTED",
      payload: isConnected,
    });
  }, [isConnected]);

  const swapFields = () => {
    // Swap the values of input1 and input2
    const temp = input1;
    setInput1(input2);
    setInput2(temp);
    setValue1(input2);
    setValue2(input1);

    setShowFirstCoin(false);
    setShowSecondCoin(false);

    setInitialFirstCoin(initialSecondCoin);
    setInitialSecondCoin(initialFirstCoin);

    setSelectedCoin(initialSecondCoin.key);
    setSelectSecondCoin(initialFirstCoin.key);

    setShowSecondCoin(showSecondCoin);
    setCurrentSwap(!currentSwap);
  };

  console.log(value3);

  const {
    data: readData,
    isError: readError,
    isLoading: readLoading,
  } = useContractRead({
    address: "0x9f272C9F9578E288D9c4a153E449Bf729f5f3a43",
    abi: FactoryABI,
    functionName: "retDiscos",
  }) as any;
  console.log(readData);

  const { config } = usePrepareContractWrite({
    address: "0x77bDcF6f892104cdD6CE685a202C3d9F0048C4cE",
    abi: metroABI,
    functionName: "buyUnitsWithEther",
    args: [input1, input2],
    value: parseEther(`${value3}`),
  });

  const { data: writeData, isLoading: loadData, isSuccess, write } = useContractWrite(config);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    write?.();
    console.log("Successful");
  };

  const {
    data: sendWaitData,
    isError: errorWaitData,
    isLoading: loadWaitData,
  } = useWaitForTransaction({
    hash: writeData?.hash,

    onError(error) {
      console.log("Error Message: ", error);
    },

    onSuccess(data) {
      console.log("Success: ", data);
    },
  });

  return (
    <div className="sm:min-h-screen">
      <AppHeadNav />
      <div
        className={`flex powerBlueBg bg-cover flex-col items-center justify-between pt-5 sm:pt-10 pb-16 sm:pb-24 px-4 sm:px-24`}
      >
        <div className="px- sm:px-0">
          <div className="tabs tabs-boxed flex-wrap p-3 rounded-[36px] text-center block w-full">
            {readData?.map((company: any, index: any) => (
              <a
                key={index}
                onClick={() => setActive(company)}
                className={`${active === company && "bg-[#15243B]"} tab text-lg sm:text-2xl`}
              >
                {company.name}
              </a>
            ))}
          </div>

          {readData?.map((name: any, index: any) => (
            <div
              key={index}
              className={`${
                name.acronym === active ? "block" : "hidden"
              } text-center py-4 sm:my-6 w-full max-h-fit sm:text-xl`}
            >
              <span>Company - {name.name} </span>
            </div>
          ))}

          <div className="main_app_g relative h-full ">
            {/* <AppHeadNav app={app} /> */}
            <div className="w-full md:max-w-fit px-4 sm:mx-auto bg-[#fefefe] p-4 relative left-0 right-0 rounded-[36px]">
              {/* <div className="my-3 block pl-2 text-2xl text-[#02051F]">Swap</div> */}
              <div className="flex flex-col gap-3 w-full border-opacity-50 text-[#8287AE]">
                <form>
                  <div className="h-fit bg-[#CDCFDE] rounded-3xl rounded-box place-items-center p-5">
                    <span className="text-lg">{!currentSwap ? "You Pay" : "You Want"}</span>
                    <div className="text-xl focus:outline-1 flex justify-end my-3 gap-5">
                      <input
                        type="number"
                        value={input1}
                        placeholder="0"
                        disabled={swapMessage === "Swapping Tokens"}
                        style={{ backgroundColor: "transparent" }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setInput1(Number(e.target.value));
                        }}
                        className="w-[60%] sm:w-full appearance-none input-ghost focus:outline-0 focus:bg-base-300 text-4xl"
                      />
                      <div
                        data-te-select-init
                        onClick={() => {
                          setShowFirstCoin(!showFirstCoin);
                          setShowSecondCoin(false);
                        }}
                        className="rounded-xl bg-[#ACAFC9] cursor-pointer flex justify-end items-center text-black gap-3 focus:border-red-300 py-1 h-[40px] px-3 w-fit tracking-[0.26px]"
                      >
                        <div className="coin_bg p- rounded-2xl">
                          <Image src={initialFirstCoin?.icon} alt={`chain_img`} className="w-6 sm:w-8 object-cover" />
                        </div>
                        <span>{initialFirstCoin?.symbol}</span>
                      </div>
                    </div>
                    {!currentSwap && (
                      <span className="flex justify-end">Balance: {!data ? "N/A" : data?.formatted}</span>
                    )}
                  </div>

                  {/* <div
                  onClick={swapFields}
                  className={`${
                    currentSwap ? "top-[26%]" : "top-[27%] sm:top-[31%]"
                  } bg-base-100 rounded-lg w-fit p-2 mx-auto my-1 absolute bg-white left-0 right-0 z-10 hover:cursor-pointer hover:bg-base-200`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.1628 13.2372C19.079 13.1536 19.0125 13.0542 18.9672 12.9449C18.9218 12.8356 18.8984 12.7183 18.8984 12.6C18.8984 12.4816 18.9218 12.3644 18.9672 12.255C19.0125 12.1457 19.079 12.0464 19.1628 11.9628L24.5628 6.56276C24.6465 6.47909 24.7459 6.41271 24.8552 6.36742C24.9645 6.32214 25.0817 6.29883 25.2 6.29883C25.3184 6.29883 25.4356 6.32214 25.5449 6.36742C25.6542 6.41271 25.7536 6.47909 25.8372 6.56276C25.9209 6.64644 25.9873 6.74578 26.0326 6.85511C26.0779 6.96445 26.1012 7.08163 26.1012 7.19997C26.1012 7.3183 26.0779 7.43548 26.0326 7.54482C25.9873 7.65415 25.9209 7.75349 25.8372 7.83717L20.4372 13.2372C20.3536 13.321 20.2543 13.3875 20.145 13.4328C20.0356 13.4782 19.9184 13.5016 19.8 13.5016C19.6817 13.5016 19.5644 13.4782 19.4551 13.4328C19.3458 13.3875 19.2464 13.321 19.1628 13.2372Z"
                      fill="#02051F"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M31.2372 13.2372C31.1536 13.321 31.0542 13.3875 30.9449 13.4328C30.8356 13.4782 30.7183 13.5016 30.6 13.5016C30.4816 13.5016 30.3644 13.4782 30.255 13.4328C30.1457 13.3875 30.0464 13.321 29.9628 13.2372L24.5628 7.83717C24.3938 7.66817 24.2988 7.43896 24.2988 7.19997C24.2988 6.96097 24.3938 6.73176 24.5628 6.56276C24.7318 6.39377 24.961 6.29883 25.2 6.29883C25.439 6.29883 25.6682 6.39377 25.8372 6.56276L31.2372 11.9628C31.321 12.0464 31.3875 12.1457 31.4328 12.255C31.4782 12.3644 31.5016 12.4816 31.5016 12.6C31.5016 12.7183 31.4782 12.8356 31.4328 12.9449C31.3875 13.0542 31.321 13.1536 31.2372 13.2372Z"
                      fill="#02051F"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.2001 7.2002C25.4388 7.2002 25.6677 7.29502 25.8365 7.4638C26.0052 7.63258 26.1001 7.8615 26.1001 8.1002V25.2002C26.1001 25.4389 26.0052 25.6678 25.8365 25.8366C25.6677 26.0054 25.4388 26.1002 25.2001 26.1002C24.9614 26.1002 24.7324 26.0054 24.5637 25.8366C24.3949 25.6678 24.3001 25.4389 24.3001 25.2002V8.1002C24.3001 7.8615 24.3949 7.63258 24.5637 7.4638C24.7324 7.29502 24.9614 7.2002 25.2001 7.2002ZM16.8373 22.763C16.9211 22.8466 16.9876 22.9459 17.0329 23.0553C17.0783 23.1646 17.1017 23.2818 17.1017 23.4002C17.1017 23.5186 17.0783 23.6358 17.0329 23.7451C16.9876 23.8545 16.9211 23.9538 16.8373 24.0374L11.4373 29.4374C11.2683 29.6064 11.0391 29.7013 10.8001 29.7013C10.5611 29.7013 10.3319 29.6064 10.1629 29.4374C9.99387 29.2684 9.89893 29.0392 9.89893 28.8002C9.89893 28.5612 9.99387 28.332 10.1629 28.163L15.5629 22.763C15.6465 22.6792 15.7458 22.6127 15.8551 22.5673C15.9645 22.5219 16.0817 22.4986 16.2001 22.4986C16.3184 22.4986 16.4357 22.5219 16.545 22.5673C16.6543 22.6127 16.7537 22.6792 16.8373 22.763Z"
                      fill="#02051F"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76294 22.7629C4.84655 22.6791 4.94586 22.6126 5.0552 22.5673C5.16454 22.5219 5.28176 22.4985 5.40014 22.4985C5.51853 22.4985 5.63574 22.5219 5.74508 22.5673C5.85443 22.6126 5.95374 22.6791 6.03734 22.7629L11.4373 28.1629C11.521 28.2466 11.5874 28.346 11.6327 28.4553C11.678 28.5646 11.7013 28.6818 11.7013 28.8001C11.7013 28.9185 11.678 29.0357 11.6327 29.145C11.5874 29.2543 11.521 29.3537 11.4373 29.4373C11.3537 29.521 11.2543 29.5874 11.145 29.6327C11.0357 29.678 10.9185 29.7013 10.8001 29.7013C10.6818 29.7013 10.5646 29.678 10.4553 29.6327C10.346 29.5874 10.2466 29.521 10.1629 29.4373L4.76294 24.0373C4.67913 23.9537 4.61263 23.8544 4.56726 23.7451C4.52189 23.6357 4.49854 23.5185 4.49854 23.4001C4.49854 23.2818 4.52189 23.1645 4.56726 23.0552C4.61263 22.9459 4.67913 22.8465 4.76294 22.7629Z"
                      fill="#02051F"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10.7999 28.7999C10.5612 28.7999 10.3323 28.7051 10.1635 28.5363C9.99472 28.3675 9.8999 28.1386 9.8999 27.8999V10.7999C9.8999 10.5612 9.99472 10.3323 10.1635 10.1635C10.3323 9.99472 10.5612 9.8999 10.7999 9.8999C11.0386 9.8999 11.2675 9.99472 11.4363 10.1635C11.6051 10.3323 11.6999 10.5612 11.6999 10.7999V27.8999C11.6999 28.1386 11.6051 28.3675 11.4363 28.5363C11.2675 28.7051 11.0386 28.7999 10.7999 28.7999Z"
                      fill="#02051F"
                    />
                  </svg>
                </div> */}
                  <div className="h-fit bg-[#CDCFDE] rounded-3xl rounded-box place-items-center p-5">
                    <span className="text-lg">Meter Number</span>
                    <div className="text-xl focus:outline-1 flex justify-end my-3 gap-5">
                      <input
                        type="number"
                        value={input2}
                        placeholder="0"
                        disabled={swapMessage === "Swapping Tokens"}
                        style={{ backgroundColor: "transparent" }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setInput2(Number(e.target.value));
                        }}
                        className="w-[60%] sm:w-full appearance-none input-ghost focus:outline-0 focus:bg-base-300 text-4xl"
                      />
                      <div
                        data-te-select-init
                        onClick={() => {
                          setShowFirstCoin(!showFirstCoin);
                          setShowSecondCoin(false);
                        }}
                        className="rounded-xl bg-[#ACAFC9] cursor-pointer flex justify-end items-center text-black gap-3 focus:border-red-300 py-1 h-[40px] px-3 w-fit tracking-[0.26px]"
                      >
                        {/* <div className="coin_bg p- rounded-2xl">
                        <Image src={initialFirstCoin?.icon} alt={`chain_img`} className="w-6 sm:w-8 object-cover" />
                      </div> */}
                        <span>METER NO.</span>
                      </div>
                    </div>
                    {!currentSwap && (
                      <span className="flex justify-end">Balance: {!data ? "N/A" : data?.formatted}</span>
                    )}
                  </div>

                  <div className="h-fit bg-[#CDCFDE] sm:mb-4 rounded-3xl rounded-box place-items-center p-5">
                    <span className="text-lg">{currentSwap ? "You Pay" : "You Get"}</span>
                    <div className="text-xl focus:outline-1 flex justify-end items-cente my-3 gap-5">
                      <input
                        type="number"
                        value={value3}
                        placeholder="0"
                        disabled
                        style={{ backgroundColor: "transparent" }}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setInput2(Number(e.target.value));
                        }}
                        className="w-[60%] sm:w-full appearance-none input-ghost focus:outline-0 focus:bg-base-300 text-4xl"
                      />
                      <div
                        data-te-select-init
                        onClick={() => {
                          setShowFirstCoin(!showFirstCoin);
                          setShowSecondCoin(false);
                        }}
                        className="rounded-xl bg-[#ACAFC9] cursor-pointer flex justify-end items-center text-black gap-3 focus:border-red-300 py-1 h-[40px] px-3 w-fit tracking-[0.26px]"
                      >
                        <div className="coin_bg p- rounded-2xl">
                          <Image src={initialSecondCoin?.icon} alt={`chain_img`} className="w-6 sm:w-8 object-cover" />
                        </div>
                        <span>{initialSecondCoin?.symbol}</span>
                      </div>
                    </div>
                    {
                      /*currentSwap &&*/ <span className="flex justify-end">
                        Balance: {!data ? "N/A" : data?.formatted}
                      </span>
                    }
                  </div>

                  <hr />
                  <div className="alert alert-info py-1 bg-transparent text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="stroke-current shrink-0 w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <span>Average number of hours - {input1 ? input1 * 4 : "0"}hrs</span>
                  </div>

                  {state?.connected === "true" && (
                    <div
                      className="!visible mt-2 bg-[#000] py-3 px-3 rounded-2xl text-center items-center md:mt-0 md:!flex md:basis-auto hover:cursor-pointer"
                      id="navbarSupportedContent3"
                      data-te-collapse-item
                    >
                      <div
                        className="list-style-none mr-auto flex w-full flex-col pl-0 md:mt-1 md:flex-row"
                        data-te-navbar-nav-ref
                      >
                        <div className="mb-4 pl-2 md:mb-0 md:pl-0 md:pr-1 mx-auto" data-te-nav-item-ref>
                          <span
                            className="p- mono_font text-white text-xl text-center transition duration-200 hover:ease-in-out motion-reduce:transition-none md:px-2"
                            data-te-nav-link-ref
                          >
                            {swapMessage !== "Swap Tokens" && <MoonLoader color={"#ffffff"} size={20} />}
                            <button onClick={handleSubmit} type="submit">
                              {loadData || loadWaitData ? "Recharging" : "Recharge"}
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </form>

                {state?.connected === "false" && (
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
                      const ready = mounted && authenticationStatus !== "loading";
                      const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus || authenticationStatus === "authenticated");
                      return (
                        <div
                          {...(!ready && {
                            "aria-hidden": true,
                            style: {
                              opacity: 0,
                              pointerEvents: "none",
                              userSelect: "none",
                            },
                          })}
                        >
                          {(() => {
                            if (!connected) {
                              return (
                                <div
                                  className="!visible mt-2 hidden bg-[#15243B] py-3 px-3 rounded-2xl text-center items-center md:mt-0 md:!flex md:basis-auto hover:cursor-pointer"
                                  id="navbarSupportedContent3"
                                  onClick={openConnectModal}
                                  data-te-collapse-item
                                >
                                  <div
                                    className="list-style-none mr-auto flex w-full flex-col pl-0 md:flex-row"
                                    data-te-navbar-nav-ref
                                  >
                                    <div className="mb-4 pl-2 md:mb-0 md:pl-0 md:pr-1 mx-auto" data-te-nav-item-ref>
                                      <span
                                        className="p- mono_font text-white text-xl text-center transition duration-200 hover:ease-in-out motion-reduce:transition-none md:px-2"
                                        data-te-nav-link-ref
                                      >
                                        Connect Wallet
                                      </span>
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
                              <div style={{ display: "flex", gap: 12 }} className="border rounded-2xl p-4">
                                <button
                                  onClick={openChainModal}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  type="button"
                                >
                                  {chain.hasIcon && (
                                    <div
                                      style={{
                                        background: chain.iconBackground,
                                        width: 12,
                                        height: 12,
                                        borderRadius: 999,
                                        overflow: "hidden",
                                        marginRight: 4,
                                      }}
                                    >
                                      {chain.iconUrl && (
                                        <img
                                          alt={chain.name ?? "Chain icon"}
                                          src={chain.iconUrl}
                                          style={{ width: 12, height: 12 }}
                                        />
                                      )}
                                    </div>
                                  )}
                                  {chain.name}
                                </button>
                                <button onClick={openAccountModal} type="button">
                                  {account.displayName}
                                  {account.displayBalance ? ` (${account.displayBalance})` : ""}
                                </button>
                              </div>
                            );
                          })()}
                        </div>
                      );
                    }}
                  </ConnectButton.Custom>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyUnits;
