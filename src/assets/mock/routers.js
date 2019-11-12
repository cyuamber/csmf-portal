module.exports =
    {
        "/api/usecaseui/csmf/userId/:userId/5gSlicing/orders": "/orders",
        
        "/api/*": "/$1",
        "/*/*": "/$1_$2",
        "/*/*/*": "/$1_$2_$3",
        "/*/*/*/*": "/$1_$2_$3_$4",
        "/*/*/*/*/*": "/$1_$2_$3_$4_$5",
        
    }