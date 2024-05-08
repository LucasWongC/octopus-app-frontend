import { chains, getChainSymbol } from "@/config/chain";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { FC, Fragment } from "react";

type Props = {
  value: Chain;
  setValue: (value: Chain) => void;
};

const ChainSelect: FC<Props> = ({ value, setValue }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center h-9 rounded-xl cursor-pointer z-10 bg-inherit hoverSupported:hover:bg-primary-100 hoverSupported:active:bg-primary-200 transition-[background] p-2">
          <div className="flex flex-row items-center bg-inherit">
            <Image
              width={24}
              height={24}
              src={`/icons/${getChainSymbol(value)?.toLowerCase()}.svg`}
              className="w-6 h-6 shrink-0"
              alt="icon"
            />
            <div className="font-medium truncate ml-2">{value}</div>
            <div className="mr-0.5">
              <div className="flex items-center justify-center shrink-0 select-none w-5 h-5 ml-1 -mr-1 text-gray">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 9L12.3536 14.6464C12.1583 14.8417 11.8417 14.8417 11.6464 14.6464L6 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-darkgrey-600 shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
          <div className="px-1 py-1 ">
            {chains.map((chain) => (
              <Menu.Item key={chain}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                    onClick={() => setValue(chain)}
                  >
                    <div className="p-1 w-7 h-7 bg-white rounded-full">
                      <Image
                        src={`/icons/${getChainSymbol(
                          value
                        )?.toLowerCase()}.svg`}
                        alt="icon"
                        width={12}
                        height={12}
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <h6 className="text-darkgrey-50 font-bold">{chain}</h6>
                    </div>
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ChainSelect;
