import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Save, Send, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VisitFormProps {
  onBack: () => void;
}

export default function VisitForm({ onBack }: VisitFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    requester: "",
    numberOfGuests: "1",
    date: "",
    timeStart: "",
    timeEnd: "",
    visitorType: "",
    clientNumber: "",
    needsCatering: "",
    location: "",
    room: "",
    deliveryTime: "",
    allergies: "",
    clientReference: "",
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
    if (!formData.requester || !formData.date || !formData.timeStart || !formData.timeEnd) {
      toast({
        title: "Champs requis manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Demande soumise",
      description: "Votre demande de visite externe a été soumise avec succès.",
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
            <Users className="h-6 w-6 mr-2 text-primary" />
            Demande de Visite Externe
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
          <CardTitle>Informations de la visite</CardTitle>
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
              <Label htmlFor="numberOfGuests">Combien de personnes accueilles-tu ? *</Label>
              <Input
                id="numberOfGuests"
                type="number"
                min="1"
                value={formData.numberOfGuests}
                onChange={(e) => handleInputChange("numberOfGuests", e.target.value)}
              />
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Quel jour ? *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeStart">Heure de début *</Label>
              <Input
                id="timeStart"
                type="time"
                value={formData.timeStart}
                onChange={(e) => handleInputChange("timeStart", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeEnd">Heure de fin *</Label>
              <Input
                id="timeEnd"
                type="time"
                value={formData.timeEnd}
                onChange={(e) => handleInputChange("timeEnd", e.target.value)}
              />
            </div>
          </div>

          {/* Visitor Type */}
          <div className="space-y-4">
            <Label>Est-ce...</Label>
            <RadioGroup
              value={formData.visitorType}
              onValueChange={(value) => handleInputChange("visitorType", value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="client" id="visitor-client" />
                <Label htmlFor="visitor-client">Un.e client.e</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partner" id="visitor-partner" />
                <Label htmlFor="visitor-partner">Un.e partenaire</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="supplier" id="visitor-supplier" />
                <Label htmlFor="visitor-supplier">Un.e fournisseur</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="visitor-other" />
                <Label htmlFor="visitor-other">Autre</Label>
              </div>
            </RadioGroup>
            
            {formData.visitorType === "client" && (
              <div className="space-y-2">
                <Label htmlFor="clientNumber">Numéro client</Label>
                <Input
                  id="clientNumber"
                  value={formData.clientNumber}
                  onChange={(e) => handleInputChange("clientNumber", e.target.value)}
                  placeholder="Numéro OSI ou référence client"
                />
              </div>
            )}
          </div>

          {/* Catering */}
          <div className="space-y-4">
            <Label>As-tu besoin d'un petit-déjeuner/goûter/repas ?</Label>
            <RadioGroup
              value={formData.needsCatering}
              onValueChange={(value) => handleInputChange("needsCatering", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oui" id="catering-oui" />
                <Label htmlFor="catering-oui">Oui</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non" id="catering-non" />
                <Label htmlFor="catering-non">Non</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location">Est-ce pour Lepic ou Fromentin ?</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir le site" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lepic">Lepic</SelectItem>
                  <SelectItem value="fromentin">Fromentin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {formData.location === "fromentin" && (
              <div className="space-y-2">
                <Label htmlFor="room">Dans quelle salle ?</Label>
                <Select value={formData.room} onValueChange={(value) => handleInputChange("room", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir la salle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="terre">Terre</SelectItem>
                    <SelectItem value="mer">Mer</SelectItem>
                    <SelectItem value="air">Air</SelectItem>
                    <SelectItem value="pierre">Pierre</SelectItem>
                    <SelectItem value="brique">Brique</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            {formData.location === "lepic" && (
              <div className="space-y-2">
                <Label htmlFor="room">Dans quelle salle ?</Label>
                <Select value={formData.room} onValueChange={(value) => handleInputChange("room", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir la salle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sous-sol">Sous-sol Lepic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Delivery and Special Requirements */}
          {formData.needsCatering === "oui" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="deliveryTime">Heure de la livraison</Label>
                <Input
                  id="deliveryTime"
                  type="time"
                  value={formData.deliveryTime}
                  onChange={(e) => handleInputChange("deliveryTime", e.target.value)}
                  placeholder="Ex: 8h30-9h"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies/restrictions</Label>
                <Input
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange("allergies", e.target.value)}
                  placeholder="Spécifier les allergies ou restrictions alimentaires"
                />
              </div>
            </div>
          )}

          {/* References and Comments */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="clientReference">Référence client.e ou prestataire</Label>
              <Input
                id="clientReference"
                value={formData.clientReference}
                onChange={(e) => handleInputChange("clientReference", e.target.value)}
                placeholder="V. ou autre référence"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="comments">As-tu une remarque/commentaire/précision à donner ?</Label>
              <Textarea
                id="comments"
                value={formData.comments}
                onChange={(e) => handleInputChange("comments", e.target.value)}
                placeholder="Commentaires additionnels..."
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}