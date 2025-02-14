import { useSelector } from "react-redux"


export const UserProfile = () => {
    const { isLoggedIn, user } = useSelector((state) => state.user)
    return (
        <>
            <section className="relative top-[20vh] ">
                <h1>Profile</h1>
                <p>{user.Name} </p>
            </section>

        </>
    )
}