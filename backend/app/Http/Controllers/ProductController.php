<?php

namespace App\Http\Controllers;

use App\Filters\ProductsFilter;
use App\Models\Product;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Requests\StoreProductRequest;
use App\Http\Resources\ProductResource;
use Illuminate\Http\Request; 
use App\Http\Resources\ProductsCollection;

class ProductController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {error_log(0);
        $filter = new ProductsFilter;
        error_log(1);
        $filterItems = $filter->transform($request);
        error_log(2);
        $products = Product::where($filterItems);
        error_log(3);
        error_log($products[0]->title);
        if ($request->query('count') === 'true') {
            $totalCount = $products->count();
            return response()->json(['total' => $totalCount]);
        }

        return response()->json(($products->paginate()->appends($request->query())->load('user')));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $productTitle = $request->input('title');
        $existingProduct = Product::where('title', $productTitle)->first();
    
        if ($existingProduct) {
            return response()->json(['message' => 'Product with the same title already exists'], 409);
        }
    
        if ($request->hasFile('image')) {
            $uploadedFile = $request->file('image');
            $name = $uploadedFile->getClientOriginalName();
    
            // Move the uploaded file to the public/images directory
            $uploadedFile->move(public_path('images'), $name);
    
            // Create the product with the image path
            $product = Product::create([
                'title' => $request->title,
                'description' => $request->description,
                'amount' => $request->amount,
                'user_id' => $request->user_id,
                'image' => $name, // Store the image link if available
            ]);
    
            return response()->json(['product' => $product]);
        }
    
        // If no image was uploaded, create the product without an image
        $product = Product::create($request->all());
    
        return response()->json([
            'message' => "Product successfully created",
            'product' => new ProductResource($product),
            'user' => $product->user 
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $product->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Delete the favorite record from the database
        $product->delete();

        return response()->json(['message' => 'Product Deleted'], 200);
    }



}
