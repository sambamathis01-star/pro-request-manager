import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Save, Send, ShoppingCart, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PurchaseFormProps {
  onBack: () => void;
}

export default function PurchaseForm({ onBack }: PurchaseFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    requester: "",
    item: "",
    entity: "",
    dateNeeded: "",
    quantity: "1",
    url: "",
    comments: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    toast({
      title: "Brouillon sauvegardé",
      description: "Votre demande a été sauvegardée en tant que brouillon.",
    });
  };

  const handleSubmit = () => {
    if (!formData.requester || !formData.item || !formData.entity || !formData.dateNeeded) {
      toast({
        title: "Champs requis manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Demande soumise",
      description: "Votre demande d'achat a été soumise avec succès.",
    });
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold flex items-center">
            <ShoppingCart className="h-6 w-6 mr-2 text-primary" />
            Demande d'Achat
          </h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
          <Button onClick={handleSubmit}>
            <Send className="h-4 w-4 mr-2" />
            Soumettre
          </Button>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Informations de l'achat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="requester">Demandeur (Nom, Prénom) *</Label>
              <Input
                id="requester"
                value={formData.requester}
                onChange={(e) => handleInputChange("requester", e.target.value)}
                placeholder="@Nom Prénom"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateNeeded">Pour quand ? *</Label>
              <Input
                id="dateNeeded"
                type="date"
                value={formData.dateNeeded}
                onChange={(e) => handleInputChange("dateNeeded", e.target.value)}
              />
            </div>
          </div>

          {/* Item Details */}
          <div className="space-y-2">
            <Label htmlFor="item">De quoi as-tu besoin ? *</Label>
            <Input
              id="item"
              value={formData.item}
              onChange={(e) => handleInputChange("item", e.target.value)}
              placeholder="Objet à acheter"
            />
          </div>

          {/* Entity */}
          <div className="space-y-4">
            <Label>Pour Sahar ou pour la Fondation ? *</Label>
            <RadioGroup
              value={formData.entity}
              onValueChange={(value) => handleInputChange("entity", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sahar" id="entity-sahar" />
                <Label htmlFor="entity-sahar">Sahar</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fondation" id="entity-fondation" />
                <Label htmlFor="entity-fondation">Fondation</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity">En quelle quantité ?</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url">Lien vers le produit</Label>
            <div className="flex space-x-2">
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
                placeholder="https://www.amazon.fr/..."
              />
              {formData.url && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(formData.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments">As-tu une remarque/commentaire/précision à donner ?</Label>
            <Textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => handleInputChange("comments", e.target.value)}
              placeholder="Merciiii ou autres précisions..."
              rows={3}
            />
          </div>

          {/* Product Preview */}
          {formData.url && (
            <Card className="bg-accent/50">
              <CardHeader>
                <CardTitle className="text-sm">Aperçu du produit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  <a 
                    href={formData.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline truncate"
                  >
                    {formData.url}
                  </a>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}