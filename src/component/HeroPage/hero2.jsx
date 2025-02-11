

export const Hero2 = ()=>{

    return(
        <section className="h-[80vh] w-[100vw] flex justify-evenly items-center bg-[orange] z-50 overflow-hidden ">
            <div className="w-[50%] mx-auto  h-[100%] flex flex-col justify-center text-center ">
                <h3 className="text-5xl font-semibold text-left ">Hang out with your memories..</h3>
                <p className="text-xl font-medium text-left my-4">Save the moments that matter. Blogger lets you safely store thousands of posts, photos, and more with Google.</p>
            </div>
            <div className="w-[38%] h-[100%] mx-auto flex items-center z-10">
                <img src="/hero2.jpg" alt="" className="h-[90%] w-auto object-cover rotate-[-10deg]  duration-500 ease-in-out hover:rotate-0 rounded-xl " />
            </div>
        </section>
    )
}