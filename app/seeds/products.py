from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_products():
    
    products = [
        {
            'name': 'GeForce RTX 3080',
            'description': "The GeForce RTXTM 3080 Ti and RTX 3080 graphics cards deliver the performance that gamers crave, powered by Ampere—NVIDIA's 2nd gen RTX architecture. They are built with dedicated 2nd gen RT Cores and 3rd gen Tensor Cores, streaming multiprocessors, and G6X memory for an amazing gaming experience.",
            'price':'699.99',
            'stock_quantity': 10,
            'category_id': 1,
            'user_id': 1
        },
        {
            'name': 'Radeon RX 6800 XT',
            'description': "The Radeon RX 6800 XT is a high-end graphics card by AMD, launched on October 28th, 2020. Built on the 7 nm process, and based on the Navi 21 graphics processor, in its Navi 21 XT variant, the card supports DirectX 12 Ultimate. This ensures that all modern games will run on Radeon RX 6800 XT.",
            'price':'649.99',
            'stock_quantity': 8,
            'category_id': 1,
            'user_id': 1
        },
        {
            'name': 'GeForce RTX 3070',
            'description': "The GeForce RTX 3070 is a high-end graphics card by NVIDIA, launched on September 1st, 2020. Built on the 8 nm process, and based on the GA104 graphics processor, in its GA104-300-A1 variant, the card supports DirectX 12 Ultimate. This ensures that all modern games will run on GeForce RTX 3070.",
            'price':'499.99',
            'stock_quantity': 12,
            'category_id': 1,
            'user_id': 1
        },
        {
            'name': 'Radeon RX 6700 XT',
            'description': "The Radeon RX 6700 XT is a high-end graphics card by AMD, launched on March 3rd, 2021. Built on the 7 nm process, and based on the Navi 22 graphics processor, in its Navi 22 XT variant, the card supports DirectX 12 Ultimate. This ensures that all modern games will run on Radeon RX 6700 XT.",
            'price':'479.99',
            'stock_quantity': 15,
            'category_id': 1,
            'user_id': 1
        },
        {
            'name': 'Intel Core i9-11900K',
            'description': "High-performance CPU for gaming and productivity. It is part of the Core i9 lineup, using the Rocket Lake-S architecture with Socket 1200. Thanks to Intel Hyper-Threading the core-count is effectively doubled, to 16 threads. Core i9-11900K has 16 MB of L3 cache and operates at 3.5 GHz by default, but can boost up to 5.3 GHz, depending on the workload.",
            'price':'539.99',
            'stock_quantity': 15,
            'category_id': 2,
            'user_id': 2
        },
        {
            'name': 'AMD Ryzen 9 5900X',
            'description': '12-core processor for unparalleled gaming performance. The AMD Ryzen 9 5900X is a high-performance desktop processor, part of the Ryzen 5000 series. It boasts 16 cores and 32 threads, with a maximum clock speed of 4.7 GHz. This powerful processor features a 3.7 GHz base clock speed and 22MB of total cache memory. With 72MB of L3 cache, it provides efficient data processing and acceleration. The Ryzen 9 5900X also supports PCIe 4.0 and has a TDP of 125W. It is an excellent choice for gaming, video editing, and other demanding applications that require significant processing power.',
            'price':'499.99',
            'stock_quantity': 12,
            'category_id': 2,
            'user_id': 2
        },
        {
            'name': 'Intel Core i7-11700K',
            'description': '8-core CPU for gaming and productivity. The 11th Gen Intel Core i7-11700K is a powerful desktop processor that offers exceptional performance and features. With 8 cores and 16 threads, it can handle demanding tasks such as gaming, video editing, and 3D modeling. This processor has a base clock speed of 3.7 GHz and a boost clock speed of up to 4.9 GHz, making it ideal for enthusiasts and professionals. It also comes with Hyper-Threading, Turbo Boost Max 3.0, and Intel Optane memory support. Overall, the i7-11700K is a great choice for those seeking a powerful processor for their desktop system.',
            'price':'399.99',
            'stock_quantity': 20,
            'category_id': 2,
            'user_id': 2
        },
        {
            'name': 'AMD Ryzen 7 5800X',
            'description': "8-core processor for high performance in games and applications. The AMD Ryzen 7 5800X is a powerful desktop processor from AMD's Ryzen 5000 series. It features 8 cores and 16 threads, with a maximum boost clock speed of 4.3 GHz. This processor is based on the Zen 3 microarchitecture and is designed for gaming and content creation. It has a total of 32 PCIe lanes, supports DDR4 memory, and comes with a cool and quiet Wraith Stealth cooler. The Ryzen 7 5800X provides excellent performance for its price, making it a popular choice among gamers and content creators.",
            'price':'449.99',
            'stock_quantity': 18,
            'category_id': 2,
            'user_id': 2
        },
        {
            'name': 'Corsair Vengeance LPX 16GB',
            'description': 'High-performance DDR4 RAM. The Corsair Vengeance LPX 16GB is a DDR4 memory kit that is designed for high-performance overclocking on Intel X99 and 100 Series motherboards. It has two 8GB modules clocked at 3000MHz and is rated for 3,200MHz. The Vengeance LPX kit is considered the best overall for its excellent performance, reliability, and price',
            'price':'89.99',
            'stock_quantity': 20,
            'category_id': 3,
            'user_id': 1
        },
        {
            'name': 'G.Skill Trident Z RGB 32GB',
            'description': "RGB DDR4 RAM for high-speed performance. The G.Skill Trident Z RGB 32GB is a DDR4 RAM memory kit that combines RGB lighting with DDR4 DRAM performance. It has a 32GB capacity (2 x 16GB modules), 288-pin, CAS Latency CL18 (18-22-22-42) at 1.35V (Intel XMP), and is compatible with AMD Ryzen 3000 and X570 Series, and Intel Z390 and newer. It's recommended for high performance or gaming memory.",
            'price':'159.99',
            'stock_quantity': 15,
            'category_id': 3,
            'user_id': 1
        },
        {
            'name': 'Kingston HyperX Fury 16GB',
            'description': 'High-speed DDR4 RAM for gaming and productivity. The HyperX Fury 16gb Ddr4 Dim is a DDR4 RAM with a speed of 3,200 MHz and two sticks. It features an updated heat spreader and can reach speeds up to 3466 MHz. It is compatible with the latest Intel and AMD CPUs and features Plug N Play automatic overclocking at 2400 MHz and 2666 MHz speeds. ',
            'price':'79.99',
            'stock_quantity': 25,
            'category_id': 3,
            'user_id': 1
        },
        {
            'name': 'Crucial Ballistix 32GB',
            'description': 'High-performance DDR4 RAM for gaming and content creation. The Crucial 16GB Ballistix DDR4 3200 MHz UDIMM Gaming is a 16GB memory kit that includes two 8GB 288-pin DDR4-3200 non-ECC unbuffered DIMMs (UDIMM). It has a low-profile design for small form factor systems and red anodized aluminum heatsinks. This memory kit has 16-18-18-36 latency timings, a 1.35V voltage requirement, and is tested to work with both AMD and Intel motherboards. It also includes XMP 2.0 support, which allows for easy overclocking for even higher performance.',
            'price':'149.99',
            'stock_quantity': 20,
            'category_id': 3,
            'user_id': 1
        },
        {
            'name': 'Samsung 970 Evo 1TB',
            'description': 'NVMe SSD with fast read/write speeds. The Samsung 970 EVO 1TB is an internal M.2 NVMe SSD that is designed for mainstream users. It has a maximum sequential read speed of 3,500 MB/s and a maximum sequential write speed of 2,500 MB/s. It also has a DRAM cache of 1 GB. ',
            'price':'149.99',
            'stock_quantity': 25,
            'category_id': 4,
            'user_id': 1
        },
        {
            'name': 'Western Digital Blue 2TB',
            'description': 'Reliable and affordable HDD. The Western Digital Blue 2TB is an internal hard drive with a 2 TB digital storage capacity and a 5400 RPM rotational speed. It has a maximum read speed of 149 MB/s and a maximum write speed of 149 MB/s. It uses a SATA connection and has a 3.5 inch form factor. It also has IntelliSeek, Data Lifeguard, NoTouch ramp load technology, and Advanced Format technology.',
            'price':'54.99',
            'stock_quantity': 30,
            'category_id': 4,
            'user_id': 1
        },
        {
            'name': 'Crucial MX500 1TB',
            'description': "SATA SSD with great performance and reliability. The Crucial MX500 is a popular SSD (solid-state drive) from Crucial, a well-known brand in the storage industry. The MX500 is available in various capacities, including 1TB, which is exactly what you're looking for. This SSD boasts impressive read and write speeds, making it perfect for applications where speed is crucial. Moreover, it's designed to be reliable and secure, with built-in encryption and a reputation for low failure rates. With a 1TB capacity, this SSD can store a massive amount of data, making it an ideal option for storing files, programs, and even operating systems.",
            'price':'99.99',
            'stock_quantity': 40,
            'category_id': 4,
            'user_id': 3
        },
        {
            'name': 'Seagate Barracuda 4TB',
            'description': "High-capacity HDD for storage needs. The Seagate Barracuda 4TB! A high-capacity external desktop hard drive designed for reliable data storage and file transfer. With 4TB of storage space, it can hold massive video collections, music libraries, and large files. The Barracuda provides USB 3.0 connectivity, allowing for fast data transfer speeds of up to 5 Gbps. Its compact design and quiet operation make it perfect for home or office use. Additionally, it's compatible with both Windows and macOS operating systems. If you need reliable storage for your digital assets, the Seagate Barracuda 4TB is a great choice.",
            'price':'94.99',
            'stock_quantity': 35,
            'category_id': 4,
            'user_id': 3
        },
        {
            'name': 'ASUS ROG Strix Z590-E',
            'description': "High-performance motherboard for gaming. The ASUS ROG Strix Z590-E is a high-performance gaming motherboard based on the Intel Z590 chipset. It features cooling solution, abundant power phases, and high-quality audio capacitors to ensure stable performance and superior audio quality. The motherboard also supports Wi-Fi 6 and USB 3.2 Gen 2 ports for fast data transfer. With its sleek and durable design, it's an excellent choice for gamers looking for a reliable and feature-rich motherboard for their gaming setup. Additionally, it's compatible with the latest 11th Gen Intel Core processors, making it a great option for those seeking a powerful and feature-rich system.",
            'price':'329.99',
            'stock_quantity': 10,
            'category_id': 5,
            'user_id': 1
        },
        {
            'name': 'MSI MPG B550 Gaming Edge',
            'description': "Motherboard with Wi-Fi 6 and robust power delivery. The MSI MPG B550 Gaming Edge is a motherboard designed for gaming PCs. It's based on the AMD B550 chipset and supports up to 64GB of DDR4 RAM with speeds of up to 4600MHz. The board features two PCIe 4.0 x16 slots, allowing for multiple graphics cards to be installed. It also has Wi-Fi, USB 3.2 Gen 2 ports, and high-quality audio capacitors. The MPG series is known for its good power delivery and efficient cooling system. This motherboard is a great option for those looking for a high-performance gaming PC with a budget-friendly price tag.",
            'price':'189.99',
            'stock_quantity': 12,
            'category_id': 5,
            'user_id': 1
        },
        {
            'name': 'Gigabyte Z490 AORUS Master',
            'description': 'High-end motherboard with advanced features. The Gigabyte Z490 Aorus Master is a high-end motherboard designed for Intel Core i9 processors. It features a 12+2 phases power design, delivering stable power to the CPU and motherboard. The board is built with a durable and high-quality PCB, ensuring reliability and longevity. It also comes with advanced cooling systems, including Wi-Fi and USB 3.2 Gen 2. Additionally, it has a luxurious audio capacitors and Op-Amp design, providing high-quality audio experience. Overall, the Gigabyte Z490 Aorus Master is a premium motherboard that offers exceptional performance, durability, and features.',
            'price':'379.99',
            'stock_quantity': 8,
            'category_id': 5,
            'user_id': 3
        },
        {
            'name': 'ASRock B450M Pro4',
            'description': 'Affordable motherboard with great features for gaming. The Asrock B450M Pro4 is a micro-ATX motherboard based on the AMD B450 chipset, designed for socket AM4 processors. It features two DDR4 RAM slots, supporting maximum 64GB of memory with speeds up to 3200MHz. The motherboard has two PCIe x16 slots, one PCIe x4 slot, and multiple USB ports, including two USB 3.2 Gen 2 ports and four USB 3.2 Gen 1 ports. It also boasts Gigabit LAN, high-quality audio capacitors, and several fan headers for optimal cooling. Overall, the Asrock B450M Pro4 is a solid choice for gamers and enthusiasts looking for a reliable and feature-rich motherboard. ',
            'price':'84.99',
            'stock_quantity': 20,
            'category_id': 5,
            'user_id': 1
        },
        {
            'name': 'Cooler Master Hyper 212',
            'description': "Affordable and efficient CPU cooler. The Cooler Master Hyper 212 is a popular computer CPU cooler widely used in gaming and overclocking configurations. It features a 120mm fan and a unique design that maximizes airflow while minimizing noise. This cooler is known for its excellent heat dissipation capabilities, making it suitable for processors with high TDPs. The Hyper 212 is also easy to install and maintain, with a simple mounting system and accessible fins for dust cleaning. Overall, it's a reliable and effective cooling solution for PC builds, especially for enthusiasts and gamers.",
            'price':'39.99',
            'stock_quantity': 20,
            'category_id': 6,
            'user_id': 2
        },
        {
            'name': 'NZXT Kraken X63',
            'description': 'High-performance liquid cooler with RGB. The Kraken X63 is a high-performance gaming desktop from Corsair, a prominent manufacturer in the computer hardware industry. Released in 2020, this beastly system is designed for serious gamers and content creators. It features a liquid-cooled Intel Core i9 processor, NVIDIA GeForce RTX 3080 graphics card, and up to 64GB of DDR4 RAM. The X63 also boasts a 1TB SSD for rapid storage and a sleek, compact design. With its impressive specs and customizable options, the Kraken X63 is an excellent choice for those seeking a powerful and versatile gaming rig.',
            'price':'149.99',
            'stock_quantity': 10,
            'category_id': 6,
            'user_id': 2
        },
        {
            'name': 'Corsair H100i RGB Platinum',
            'description': "High-performance liquid cooler with vibrant RGB lighting. The H100i RGB Platinum is a high-performance cooler designed for overclocking and intense gaming. It features a 360mm radiator, 16 LED RGB fans, and a proprietary NLX bracket for easy installation. The product is praised for its exceptional cooling capabilities, quiet operation, and sleek aesthetic design. If you're in the market for a reliable and premium CPU cooler, the H100i RGB Platinum is definitely worth considering.",
            'price':'159.99',
            'stock_quantity': 12,
            'category_id': 6,
            'user_id': 2
        },
        {
            'name': 'Noctua NH-D15',
            'description': "Premium CPU cooler with exceptional performance. The Noctua NH-D15 is a highly-regarded CPU cooler from Austrian company Noctua. This air cooler is designed for extreme overclocking and boasts an impressive 140mm fan with a max speed of 1,500 RPM. Its heatsink is built using a six heatpipe design, which helps to efficiently dissipate heat. Featuring a conventional fan setup, it's compatible with most CPU sockets, including Intel LGA 1200 and AMD AM4. The NH-D15 is known for its high silent operation, low voltage consumption, and high performance, making it a popular choice among enthusiasts and overclockers.",
            'price':'89.99',
            'stock_quantity': 15,
            'category_id': 6,
            'user_id': 2
        },
        {
            'name': 'NZXT H510',
            'description': "Compact mid-tower ATX case. New features: Front I/O USB Type-C Port and Tempered glass side panel with single screw installation Enhanced cable management: Our patented cable routing kit with pre-installed channels and straps makes wiring easy and intuitive STREAMLINED COOLING: 2 Aer F120mm fans included for optimal internal airflow and the front panel and PSU intakes include removable filters, removable bracket designed for radiators up to 240mm - simplifies the installation of either closed-loop or custom-loop water cooling Motherboard support: Mini-ITX, MicroATX, and ATX",
            'price':'79.99',
            'stock_quantity': 15,
            'category_id': 7,
            'user_id': 1
        },
        {
            'name': 'Corsair iCUE 4000X',
            'description': 'Mid-tower ATX case with tempered glass. The iCUE 4000x is a high-performance case from Corsair, designed for PC enthusiasts and gamers. This mid-tower case features a sleek and modular design, with ample room for storage and expansion. It supports for up to 14 fans, including 3 included RGB fans, and has a tempered glass side panel for a premium look. The iCUE 4000x also has room for a 380mm radiator and a 240mm radiator on the top. Its cable management system keeps your build tidy and organized, making it an ideal choice for those seeking a high-performance and stylish housing solution. ',
            'price':'129.99',
            'stock_quantity': 10,
            'category_id': 7,
            'user_id': 1
        },
        {
            'name': 'Fractal Design Meshify C',
            'description': "Mid-tower case with high airflow and sleek design. The Fractal Design Meshify C is a popular case for building custom PCs. It's known for its exceptional airflow and stylish design. The Meshify C features a mesh façade that allows for maximum airflow, while its refractive edges create a mesmerizing visual effect. This case is ideal for builders who prioritize cooling and want to showcase their components. It supports ATX, Micro-ATX, and Mini-ITX motherboards and has room for up to four 2.5-inch drives and two 3.5-inch drives. Overall, the Fractal Design Meshify C is a great choice for those who want a well-ventilated and visually appealing case.",
            'price':'89.99',
            'stock_quantity': 12,
            'category_id': 7,
            'user_id': 2
        },
        {
            'name': 'Phanteks Eclipse P400A',
            'description': 'High-airflow mid-tower case with RGB lighting. The Phantom Phanteks Eclipse P400A is a high-end computer case designed for PC enthusiasts and builders. It features a sleek and luxurious design with a tempered glass side panel, aluminum frame, and a unique ventilation system. The case offers excellent cable management, extensive storage options, and compatibility with large radiators and liquid cooling systems. Its premium features make it an ideal choice for builders who want a high-performance system that looks and performs great. The P400A is a popular choice among gamers, content creators, and professionals who demand top-notch performance and aesthetics.',
            'price':'94.99',
            'stock_quantity': 14,
            'category_id': 7,
            'user_id': 3
        },
        {
            'name': 'Dell UltraSharp U2720Q',
            'description': '27-inch 4K monitor for professional use. The Dell U2720Q is a 27-inch 4K IPS monitor designed for professional use. It features a resolution of 3840 x 2160, making it ideal for graphic design, video editing, and other applications that require precise color representation. The monitor also supports HDR10 and has a wide color gamut, ensuring accurate color reproduction. Additionally, it has a fast 5ms response time and is compatible with AMD FreeSync technology. Overall, the Dell U2720Q is a high-quality monitor suitable for demanding office and creative use.',
            'price':'539.99',
            'stock_quantity': 8,
            'category_id': 8,
            'user_id': 1
        },
        {
            'name': 'ASUS TUF Gaming VG27AQ',
            'description': '27-inch gaming monitor with 165Hz refresh rate. The ASUS TUF Gaming VG27AQ is a 27-inch gaming monitor featuring a 165Hz refresh rate, 1ms response time, and NVIDIA G-Sync technology. It also boasts a QHD (2560x1440) resolution, 90% DCI-P3 color gamut, and 3000:1 contrast ratio. This monitor is designed for fast-paced games with minimal screen tearing and blur. Additionally, it features a stylish design with a flip-up stand and CAM SHIFT technology for flexible monitor adjustments. Overall, the ASUS TUF Gaming VG27AQ is a great choice for gamers seeking a high-performance monitor with impressive visuals.',
            'price':'429.99',
            'stock_quantity': 10,
            'category_id': 8,
            'user_id': 1
        },
        {
            'name': 'LG UltraGear 27GN950-B',
            'description': "27-inch 4K gaming monitor with 144Hz refresh rate. The LG UltraGear 27GN950-B is a high-performance gaming monitor featuring a stunning 27 inch 4K Nano IPS display with a 144Hz refresh rate and 1ms response time. It's designed to provide an immersive gaming experience with HDR10, G-Sync Compatible, and AMD FreeSync technology. The panel also supports Dolby Vision and HDR10+. Additionally, it has a sleek and slim design, with a cable management system and a customizable RGB lighting effect. With its exceptional visuals and silky-smooth performance, this monitor is an excellent choice for serious gamers and graphic designers.",
            'price':'799.99',
            'stock_quantity': 5,
            'category_id': 8,
            'user_id': 2
        },
        {
            'name': 'Acer Predator X34',
            'description': "34-inch curved ultrawide gaming monitor. The Acer Predator X34 is a 34-inch gaming monitor developed by Acer in collaboration with NVIDIA's G-Sync technology. It features a curved ultra-wide QHD display, a 100Hz refresh rate, and NVIDIA GeForce support. This monitor is designed for immersive gaming experiences, providing a sense of immersion and precision. With a 3440 x 1440 resolution, it offers vibrant colors and a wide viewing angle. Additionally, it has a range of customization options, such as AMD's FreeSync and NVIDIA's G-Sync compatibility.",
            'price':'999.99',
            'stock_quantity': 6,
            'category_id': 8,
            'user_id': 3
        },
        {
            'name': 'Corsair CX450',
            'description': 'The Corsair CX450 is a high-quality power supply unit that provides reliable and efficient power to your PC. It delivers 450 watts of continuous power and is 80 PLUS Bronze certified, ensuring up to 85% efficiency. The fully modular design allows you to only use the cables you need, reducing clutter and improving airflow. With a quiet 120mm fan, the CX450 operates silently even under full load. Built with high-quality capacitors and backed by a 5-year warranty, this PSU is perfect for mainstream desktop PCs.',
            'price':'103.99',
            'stock_quantity': 1,
            'category_id': 9,
            'user_id': 2
        },
        {
            'name': 'EVGA 500 W1',
            'description': 'The EVGA 500 W1 is a reliable power supply unit designed for both performance and affordability. With a power output of 500 watts, this PSU is 80+ White certified, offering up to 80% efficiency under typical loads. It features a robust design with high-quality components to ensure long-lasting performance. The EVGA 500 W1 is equipped with a quiet and intelligent cooling fan that adjusts RPM based on temperature, minimizing noise and enhancing cooling efficiency. With a 3-year warranty and support from EVGA, this power supply is a great choice for budget-conscious builders.',
            'price':'164.99',
            'stock_quantity': 5,
            'category_id': 9,
            'user_id': 2
        },
        {
            'name': 'Thermaltake Smart 600W',
            'description': 'The Thermaltake Smart 600W power supply offers a perfect blend of performance and value. Delivering 600 watts of continuous power, it is 80+ White certified, ensuring up to 86% efficiency. The PSU is equipped with a 120mm ultra-quiet cooling fan that keeps your system cool while operating quietly. Designed with premium components, the Smart 600W ensures stable and reliable performance. It supports SLI and CrossFire configurations, making it suitable for multi-GPU setups. With multiple protection features and a 5-year warranty, this PSU is ideal for both gamers and PC enthusiasts.',
            'price':'55.83',
            'stock_quantity': 3,
            'category_id': 9,
            'user_id': 2
        },
        {
            'name': 'Cooler Master MWE 650W',
            'description': 'The Cooler Master MWE 650W is a high-efficiency power supply unit that provides 650 watts of continuous power. It is 80+ Bronze certified, offering up to 88% efficiency to reduce energy consumption and heat generation. The active PFC and high-quality capacitors ensure stable and reliable power delivery. The MWE 650W features a quiet 120mm HDB fan that operates silently while providing excellent cooling. Its compact and fully modular design allows for easy installation and improved cable management. With multiple protection measures and a 5-year warranty, this PSU is a great choice for any PC build.',
            'price':'77.99',
            'stock_quantity': 3,
            'category_id': 9,
            'user_id': 2
        },
        {
            'name': 'Seasonic S12III 500 SSR-500GB3',
            'description': 'The Seasonic S12III 500 SSR-500GB3 is a high-performance power supply unit designed to meet the needs of demanding PC builds. It delivers 500 watts of continuous power and is 80+ Bronze certified, ensuring up to 85% efficiency. The PSU features a high-quality double ball bearing fan that provides superior cooling and quiet operation. Built with premium components, including Japanese capacitors, the S12III 500 ensures long-term reliability and stability. The unit is also equipped with comprehensive protection features to safeguard your system. With a 5-year warranty, the Seasonic S12III 500 is a trusted choice for builders seeking performance and durability.',
            'price':'81.99',
            'stock_quantity': 3,
            'category_id': 9,
            'user_id': 2
        },
        {
            'name': 'Corsair RM850x',
            'description': 'The Corsair RM850x is a high-performance power supply unit that delivers 850 watts of continuous power. It is 80 PLUS Gold certified, offering up to 90% efficiency to reduce energy consumption and heat. The fully modular design allows for easy cable management and improved airflow within your case. The RM850x features a 135mm ML Series magnetic levitation fan, providing ultra-low noise operation and excellent cooling performance. With 100% Japanese capacitors, this PSU ensures long-term reliability and stability. The RM850x is backed by a 10-year warranty, making it an ideal choice for high-performance PCs and workstations.',
            'price':'129',
            'stock_quantity': 5,
            'category_id': 9,
            'user_id': 2
        },
        {
            'name': 'EVGA SuperNOVA 850 G5',
            'description': 'The EVGA SuperNOVA 850 G5 is a premium power supply unit designed for high-end PC builds. It provides 850 watts of continuous power and is 80 PLUS Gold certified, ensuring up to 92% efficiency under typical loads. The fully modular design allows for clean and efficient cable management. The G5 series is equipped with a 135mm Fluid Dynamic Bearing fan that offers quiet operation and superior cooling. With high-quality Japanese capacitors and a robust design, the SuperNOVA 850 G5 ensures reliable and stable power delivery. This PSU includes comprehensive protection features and comes with a 10-year warranty, making it a top choice for enthusiasts and gamers.',
            'price':'139',
            'stock_quantity': 4,
            'category_id': 9,
            'user_id': 2
        }


    ]
    
    for product_data in products:
        product = Product(
            name=product_data['name'],
            description=product_data['description'],
            price=product_data['price'],
            stock_quantity=product_data['stock_quantity'],
            category_id=product_data['category_id'],
            user_id=product_data['user_id']
        )
        db.session.add(product)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
        
    db.session.commit()
