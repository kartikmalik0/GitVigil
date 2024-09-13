
const Testimonials = () => {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-card p-6 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
                        >
                            <p className="text-card-foreground mb-4">
                                "GitVigil has revolutionized how I manage my GitHub contributions. It's an essential tool for any developer!"
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-primary rounded-full mr-4"></div>
                                <div>
                                    <h3 className="font-semibold">John Doe</h3>
                                    <p className="text-sm text-muted-foreground">Senior Developer</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials
