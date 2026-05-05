const PendingTask = ({ title }: { title: string }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>Đây là trang Task chờ xử lý</p>
        </div>
    );
};

export default PendingTask;
