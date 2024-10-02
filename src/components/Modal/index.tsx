import { Dialog } from "@headlessui/react";
import { SetStateAction, Dispatch, ReactElement } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>> | ((arg0: boolean) => void);
  children?: ReactElement;
  isLogin?: boolean;
  scroll?: boolean;
}

const Modal = ({
  isOpen = false,
  setIsOpen,
  children,
  isLogin,
  scroll = false,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div
        className={"absolute inset-0 z-[100] bg-[#0f0f0f] opacity-80 blur-3xl"}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="fixed z-[201] md:mt-0 min-w-[250px] md:min-w-[700px] lg:min-w-[960px]">
          <div
            className={
              "dark:bg-[#201E28] bg-white relative mt-8 flex h-full w-[350px] flex-col justify-center rounded-[20px] border-[2px] border-black/75 p-5 md:w-[100%] md:p-8 "
            }
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute dark:text-[#a4a4a4] text-black right-2 top-2 text-xl z-[999]"
            >
              <AiOutlineClose />
            </button>
            {children}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
