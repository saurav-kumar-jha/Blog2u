

export const Hero = () => {

    return (
        <>
            <section className="h-[100vh] w-[100vw] bg-img " >
                <section className="h-[80vh] w-[100%] absolute top-[20vh]  backdrop-blur-[2px] " >
                    <div className="w-full flex justify-center items-center flex-col h-[35%]">
                        <h1 className="text-6xl font-bold text-center ">Discover New Ideas, One Post at a Time</h1>
                        <p className="text-2xl font-[500] font-mono text-center mt-2 ">Create a unique and beautiful blog easily</p>
                    </div>

                    <div className="h-[15%] w-full flex justify-center items-center ">
                        <button className="h-auto w-auto px-8 py-4 bg-[orange] text-white text-2xl font-semibold cursor-pointer hover:scale-110 duration-200 ease-in-out active:scale-90  rounded-xl ">Get started</button>
                    </div>
                </section>

            </section>
        </>
    )
}