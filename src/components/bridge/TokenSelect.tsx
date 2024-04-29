import { tokens } from "@/config/tokens";
import { Menu, Transition } from "@headlessui/react";
import Image from "next/image";
import { FC, Fragment } from "react";

type Props = {
  value: Currency;
  setValue: (value: Currency) => void;
};

const TokenSelect: FC<Props> = ({ value, setValue }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center gap-2 w-full cursor-pointer">
          <div className="p-1 w-7 h-7 bg-white rounded-full">
            <Image
              src={`/icons/${value.symbol.toLowerCase()}.svg`}
              alt="icon"
              width={12}
              height={12}
              className="w-full h-full"
            />
          </div>
          <div>
            <h6 className="text-darkgrey-50 font-bold">
              {value.symbol} ({value.chain})
            </h6>
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
            {tokens.map((token) => (
              <Menu.Item key={token.id}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                    onClick={() => setValue(token)}
                  >
                    <div className="p-1 w-7 h-7 bg-white rounded-full">
                      <Image
                        src={`/icons/${token.symbol.toLowerCase()}.svg`}
                        alt="icon"
                        width={12}
                        height={12}
                        className="w-full h-full"
                      />
                    </div>
                    <div>
                      <h6 className="text-darkgrey-50 font-bold">
                        {token.symbol} ({token.chain})
                      </h6>
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

export default TokenSelect;
