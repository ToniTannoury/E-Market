<?php 
namespace App\Filters;
use Illuminate\Http\Request;
use App\Filters\ApiFilter;



class ProductsFilter extends ApiFilter{
  protected $allowedParms = [
    'user_id' => ['eq'],
    'amount'=> ['eq' ,'lt' , 'gt' , "lte" , 'gte'],
    'title'=> ['eq'],
  ];


  protected $operatorMap = [
    'eq' => '=',
    'lt' => '<',
    'lte' => '<=',
    'gt' => '>',
    'gte' => '>=',
    'ne' => "!="
  ];
}