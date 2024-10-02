import { Dialog } from "@headlessui/react";
import { SetStateAction, Dispatch, ReactElement } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface FullModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children?: ReactElement;
}

export const FullModal = ({
  isOpen = false,
  setIsOpen,
  children,
}: FullModalProps) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel className="styled-scrollbar fixed inset-0 z-[200] min-h-full w-full overflow-x-hidden overflow-y-scroll bg-[#0f0f0f] bg-opacity-90">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute left-5 top-5 rounded-md border text-3xl"
        >
          <AiOutlineClose color="#fff" />
        </button>
        {children}
      </Dialog.Panel>
    </Dialog>
  );
};
