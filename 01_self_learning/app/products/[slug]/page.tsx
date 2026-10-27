
export default async function ProductDetailPage({params,} : {params : Promise<{slug : string }>}){
    const {slug } = await params;
    console.log(`Slug number : ${slug}`)
    return(
        <div>
            <h1>Product Details Page</h1>
        </div>
    )
}