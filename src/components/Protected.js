const Protected = ({ isAuthenticated, username, role }) => {
    console.log(isAuthenticated);
    console.log(username);
    console.log(role);

    if (!isAuthenticated) {
        return (
            <p className="min-h-100 d-flex justify-content-between align-items-center">
                Loading...
            </p>
        );
    }

    return (
        <>
            {isAuthenticated && (
                <div className="container">
                <div className="card w-100 my-3 text-light bg-dark">
                    <div className="card-body">
                        <h5 className="card-title mb-4">Пользователь:</h5>
                        <p className="card-text">Имя: {username}</p>
                        <p className="card-text">Роль: {role}</p>
                    </div>
                </div>
                </div>
            
            )}
        </>
    );
};

export default Protected;