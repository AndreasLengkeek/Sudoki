import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';

type TPopup = {
  open: boolean;
  time: string;
  togglePopup: (value: boolean, newPuzzle: boolean) => void;
};
export const SuccessfullyCompletedModal = ({ open, time, togglePopup }: TPopup) => {

  return (
    <Transition.Root appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => togglePopup(false, false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center items-center p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="flex flex-col items-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                      <TrophyIcon className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                      <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                        Congratulations!
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">You have completed the puzzle 🎉</p>
                        <p className="text-sm text-gray-500">It took: {time}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col sm:px-6">
                  <button
                    type="button"
                    className="justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 w-auto mb-3"
                    onClick={() => togglePopup(false, true)}>
                    New puzzle
                  </button>
                  <button
                    type="button"
                    className="justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-auto"
                    onClick={() => togglePopup(false, false)}>
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
