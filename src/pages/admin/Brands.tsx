
import React, { useState } from 'react';
import { Brand } from '@/types';
import { brands as initialBrands } from '@/data/brands';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const BrandsManager = () => {
  const [brands, setBrands] = useState<Brand[]>(initialBrands);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState<Partial<Brand>>({});
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleAddEdit = () => {
    if (!currentBrand.name || !currentBrand.logo) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill all required fields"
      });
      return;
    }

    if (isEditing) {
      setBrands(brands.map(brand => 
        brand.id === currentBrand.id ? { ...brand, ...currentBrand } as Brand : brand
      ));
      toast({
        title: "Brand Updated",
        description: `${currentBrand.name} has been updated successfully.`
      });
    } else {
      const newBrand: Brand = {
        id: `brand${brands.length + 1}`,
        name: currentBrand.name!,
        description: currentBrand.description || "",
        logo: currentBrand.logo!,
        featured: currentBrand.featured || false
      };
      setBrands([...brands, newBrand]);
      toast({
        title: "Brand Added",
        description: `${currentBrand.name} has been added successfully.`
      });
    }

    setIsDialogOpen(false);
    setCurrentBrand({});
    setIsEditing(false);
  };

  const handleEdit = (brand: Brand) => {
    setCurrentBrand(brand);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setBrands(brands.filter(brand => brand.id !== id));
    toast({
      title: "Brand Deleted",
      description: "The brand has been deleted successfully."
    });
  };

  const handleNewBrand = () => {
    setCurrentBrand({});
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Brands Management</h1>
        <Button onClick={handleNewBrand}>
          <Plus className="mr-2 h-4 w-4" />
          Add Brand
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands.map((brand) => (
            <TableRow key={brand.id}>
              <TableCell>
                <img 
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 w-12 rounded-md object-contain"
                />
              </TableCell>
              <TableCell className="font-medium">{brand.name}</TableCell>
              <TableCell className="max-w-sm truncate">{brand.description}</TableCell>
              <TableCell>{brand.featured ? 'Yes' : 'No'}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(brand)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(brand.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Brand' : 'Add New Brand'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update the brand details below.' : 'Fill in the brand details below to add it to the system.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name*
              </Label>
              <Input
                id="name"
                value={currentBrand.name || ''}
                onChange={(e) => setCurrentBrand({ ...currentBrand, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="logo" className="text-right">
                Logo URL*
              </Label>
              <Input
                id="logo"
                value={currentBrand.logo || ''}
                onChange={(e) => setCurrentBrand({ ...currentBrand, logo: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2">
                Description
              </Label>
              <Textarea
                id="description"
                value={currentBrand.description || ''}
                onChange={(e) => setCurrentBrand({ ...currentBrand, description: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="featured" className="text-right">
                Featured
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={currentBrand.featured || false}
                  onCheckedChange={(checked) => 
                    setCurrentBrand({ ...currentBrand, featured: checked as boolean })
                  }
                />
                <label htmlFor="featured" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Display as featured brand
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddEdit}>
              {isEditing ? 'Save Changes' : 'Add Brand'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BrandsManager;
