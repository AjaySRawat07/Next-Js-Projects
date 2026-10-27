

export default async function CachingAllROute({params,}: {params : Promise<{slug : string[]}>; }){

    const {slug} = await params;
    console.log(slug);

    return(
        <div>
            <h1>Get All Caching T1</h1>
        </div>
    )
}