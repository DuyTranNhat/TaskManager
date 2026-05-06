import { Modal, Icon } from '~/components';

const LogoutModal = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <div className="flex flex-col items-center gap-2">
                <Icon.LogoutIcon className="bg-gradient-color size-16 rounded-full p-3 text-white" />
                <h1 className="text-lg font-bold">Xác nhận đăng xuất</h1>
                <p className="text-sm">Bạn có chắc muốn đăng xuất ?</p>
                <div className="text-md mt-1 flex w-50 font-bold">
                    <button
                        className="bg-gradient-color flex-1 cursor-pointer rounded-tl-2xl rounded-bl-2xl py-1 opacity-85 hover:opacity-100"
                    >
                        Có
                    </button>
                    <button
                        className="flex-1 cursor-pointer rounded-tr-2xl rounded-br-2xl bg-gray-300 py-1 opacity-85 hover:opacity-100"
                        onClick={() => setOpen(false)}
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default LogoutModal;
