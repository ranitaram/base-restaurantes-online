export const revalidate = false
import { redirect } from "next/navigation";

import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions";

import { Gender } from "@prisma/client";



interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page?: string;
    }
}


export default async function GenderByPage({params, searchParams}: Props) {

    const {gender} = params;
   

     //si viene el searchParams lo parseamos y si no viene entonces va a ser la pagina 1
 const page = searchParams.page ? parseInt(searchParams.page) : 1;
 const {products, currentPage, totalPages} = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
});

 if (products.length === 0){
   redirect(`/gender/${gender}` );
}



    const labels: Record<string, string> = {
        'specialities': 'Specialities',
        'kid': 'kids',
        'ceviche': 'Ceviches',
        'cocktail': 'Cocktails',
        'soup': 'Soup',
        'sides': 'Sides',
        'botanas': 'Botanas',
    }

    // if (id === 'kids') {
    //     notFound();
    // }

    return (
        <>
        <Title 
        title={`${labels [gender]} `}
        subtitle="Todos los Platillos" 
        className="mb-2">
     
        </Title>
     
        <ProductGrid products={products}></ProductGrid>
        <Pagination totalPages={totalPages}></Pagination>
        </>
    )
}