import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'garland' | 'decor';
  image: string;
  features: string[];
  occasions: string[];
  power: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Гирлянда "Уютные домики"',
    price: 1290,
    category: 'garland',
    image: 'https://cdn.poehali.dev/projects/8916f4ad-94df-45ce-bf78-021b77d43695/files/d9869f04-495f-4ef8-a44f-0e015441169b.jpg',
    features: ['2 метра', '10 домиков', 'Тёплый свет', 'USB/батарейки'],
    occasions: ['Новый год', 'Фотосессии', 'Детская комната'],
    power: 'USB + батарейки'
  },
  {
    id: 2,
    name: 'Гирлянда "Звёздное небо"',
    price: 890,
    category: 'garland',
    image: 'https://cdn.poehali.dev/projects/8916f4ad-94df-45ce-bf78-021b77d43695/files/c73c03da-8ec3-4e39-ba16-6e517f4fe06d.jpg',
    features: ['3 метра', 'Светодиодная', 'Тёплый свет', 'На батарейках'],
    occasions: ['Свадьба', 'День рождения', 'Декор окон'],
    power: 'Батарейки'
  },
  {
    id: 3,
    name: 'Набор праздничного декора',
    price: 1590,
    category: 'decor',
    image: 'https://cdn.poehali.dev/projects/8916f4ad-94df-45ce-bf78-021b77d43695/files/61b66473-e480-40b1-9b24-63dfcbbf3b87.jpg',
    features: ['Шарики + гирлянда', 'Комплект', 'Яркие цвета', 'USB'],
    occasions: ['День рождения', 'Вечеринки', 'Хэллоуин'],
    power: 'USB'
  },
  {
    id: 4,
    name: 'Гирлянда "Волшебный свет"',
    price: 990,
    category: 'garland',
    image: 'https://cdn.poehali.dev/projects/8916f4ad-94df-45ce-bf78-021b77d43695/files/d9869f04-495f-4ef8-a44f-0e015441169b.jpg',
    features: ['2.5 метра', 'LED', 'Тёплый свет', 'На батарейках'],
    occasions: ['Офис', 'Квартира', 'Стеллаж'],
    power: 'Батарейки'
  },
  {
    id: 5,
    name: 'Декор "Праздничная атмосфера"',
    price: 1790,
    category: 'decor',
    image: 'https://cdn.poehali.dev/projects/8916f4ad-94df-45ce-bf78-021b77d43695/files/61b66473-e480-40b1-9b24-63dfcbbf3b87.jpg',
    features: ['Гирлянда + фонарики', 'Деревянные элементы', 'USB/батарейки'],
    occasions: ['Свадьба', 'Новый год', 'Фотосессии'],
    power: 'USB + батарейки'
  },
  {
    id: 6,
    name: 'Гирлянда "Тёплый вечер"',
    price: 790,
    category: 'garland',
    image: 'https://cdn.poehali.dev/projects/8916f4ad-94df-45ce-bf78-021b77d43695/files/c73c03da-8ec3-4e39-ba16-6e517f4fe06d.jpg',
    features: ['1.5 метра', 'LED', 'Тёплый свет', 'USB'],
    occasions: ['Ночник', 'Детская', 'Елка'],
    power: 'USB'
  }
];

export default function Index() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
    toast.success('Добавлено в корзину!', {
      description: product.name
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
    toast.info('Товар удалён из корзины');
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  };

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl animate-glow">✨</div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary">
                  Праздничные Огни
                </h1>
                <p className="text-sm text-muted-foreground hidden md:block">
                  Создаём волшебную атмосферу
                </p>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="lg"
              className="relative group hover:scale-105 transition-transform"
              onClick={() => {
                if (cart.length === 0) {
                  toast.info('Корзина пуста');
                }
              }}
            >
              <Icon name="ShoppingCart" className="mr-2" />
              Корзина
              {cart.length > 0 && (
                <Badge className="ml-2 bg-secondary animate-glow">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/10 via-accent/5 to-transparent">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <div className="inline-block mb-4">
            <Badge variant="secondary" className="text-lg px-4 py-2 animate-glow">
              🎄 Новый год 2024
            </Badge>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Волшебство в каждом огоньке
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Гирлянды и декор для создания незабываемой праздничной атмосферы
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <Icon name="Battery" className="text-primary" size={20} />
              <span className="text-sm font-medium">USB + Батарейки</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <Icon name="Lightbulb" className="text-accent" size={20} />
              <span className="text-sm font-medium">Тёплый LED</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-full shadow-sm">
              <Icon name="Sparkles" className="text-secondary" size={20} />
              <span className="text-sm font-medium">2-3 метра</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="all" className="text-base">
              Всё
            </TabsTrigger>
            <TabsTrigger value="garland" className="text-base">
              Гирлянды
            </TabsTrigger>
            <TabsTrigger value="decor" className="text-base">
              Декор
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card 
                  key={product.id} 
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative overflow-hidden aspect-square">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      {product.category === 'garland' && (
                        <Badge className="bg-primary/90 backdrop-blur-sm">
                          Гирлянда
                        </Badge>
                      )}
                      {product.category === 'decor' && (
                        <Badge className="bg-accent/90 backdrop-blur-sm">
                          Декор
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.features.map((feature, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        <Icon name="Calendar" className="inline mr-1" size={16} />
                        Подходит для:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {product.occasions.map((occasion, i) => (
                          <span key={i} className="text-xs text-primary font-medium">
                            {occasion}{i < product.occasions.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="text-3xl font-bold text-primary">
                        {product.price} ₽
                      </div>
                      <Button 
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all"
                      >
                        <Icon name="Plus" className="mr-2" size={18} />
                        В корзину
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {cart.length > 0 && (
        <section className="py-8 bg-white border-t sticky bottom-0 shadow-2xl z-40">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Icon name="ShoppingCart" />
                Ваша корзина
              </h3>
              
              <div className="space-y-3 mb-6">
                {cart.map(item => (
                  <div 
                    key={item.product.id}
                    className="flex items-center gap-4 bg-muted/30 p-4 rounded-lg"
                  >
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} шт. × {item.product.price} ₽
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        {item.product.price * item.quantity} ₽
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-destructive"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Итого:</p>
                  <p className="text-4xl font-bold text-primary">
                    {getTotalPrice()} ₽
                  </p>
                </div>
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-secondary to-primary hover:shadow-xl text-white text-lg px-8"
                  onClick={() => toast.success('Спасибо за заказ! Мы свяжемся с вами.')}
                >
                  <Icon name="Check" className="mr-2" />
                  Оформить заказ
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-gradient-to-b from-muted/20 to-muted/50 py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="text-3xl animate-glow">✨</div>
            <h3 className="text-2xl font-bold">Праздничные Огни</h3>
          </div>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Создаём волшебную атмосферу для ваших праздников: Новый год, дни рождения, свадьбы, Хэллоуин
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Icon name="Phone" className="text-primary" size={20} />
              <span>+7 (999) 123-45-67</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Mail" className="text-primary" size={20} />
              <span>info@lights.ru</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="MapPin" className="text-primary" size={20} />
              <span>Москва</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Праздничные Огни. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
