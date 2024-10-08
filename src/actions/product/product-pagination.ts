'use server'

import prisma from "@/lib/prisma"
import { Gender } from "@prisma/client";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({
   page = 1,
   take = 12,
   gender,
}: PaginationOptions) => {
        //validacion por si no mandan un numero en la url
        if (isNaN(Number(page))) page = 1;
        if (page < 1 ) page = 1;
    try {
        //paso 1: Obtener los productos
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1 ) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            where: {
                gender: gender
            }
        })
        //paso 2: Obtener el total de paginas
        //TODO: 
        const totalCount = await prisma.product.count({
            where: {
                gender: gender
            }
        })
        //para sacar el total de paginas
        const totalPages = Math.ceil(totalCount / take);
    
        //ahora regresamos un objeto
        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        }
    } catch (error) {
        throw new Error('No se pudo cargar los productos')
    }
}