const CompletedTask = ({ title }: { title: string }) => {
    return (
        <div>
            <h1>{title}</h1>
            <p>Đây là trang Task hoàn tất</p>
        </div>
    );
};

export default CompletedTask;
