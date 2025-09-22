import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Save, Send, Plane, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TravelFormProps {
  onBack: () => void;
}

export default function TravelForm({ onBack }: TravelFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    requester: "",
    destination: "",
    purpose: "",
    startDate: "",
    endDate: "",
    transportation: "",
    accommodation: "",
    budget: "",
    projectCode: "",
    clientMeeting: "",
    clientName: "",
    urgency: "",
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
    if (!formData.requester || !formData.destination || !formData.purpose || !formData.startDate || !formData.endDate) {
      toast({
        title: "Champs requis manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Demande soumise",
      description: "Votre demande de voyage professionnel a été soumise avec succès.",
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
            <Plane className="h-6 w-6 mr-2 text-primary" />
            Demande de Voyage Professionnel
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
          <CardTitle>Informations du voyage</CardTitle>
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
              <Label htmlFor="destination">Destination *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => handleInputChange("destination", e.target.value)}
                  placeholder="Ville, Pays"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Purpose and Dates */}
          <div className="space-y-2">
            <Label htmlFor="purpose">Objet du voyage *</Label>
            <Textarea
              id="purpose"
              value={formData.purpose}
              onChange={(e) => handleInputChange("purpose", e.target.value)}
              placeholder="Décrivez l'objectif du voyage professionnel"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de départ *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de retour *</Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
              />
            </div>
          </div>

          {/* Transportation and Accommodation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="transportation">Moyen de transport préféré</Label>
              <Select value={formData.transportation} onValueChange={(value) => handleInputChange("transportation", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir le transport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="avion">Avion</SelectItem>
                  <SelectItem value="train">Train</SelectItem>
                  <SelectItem value="voiture">Voiture de fonction</SelectItem>
                  <SelectItem value="voiture-perso">Voiture personnelle</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accommodation">Type d'hébergement</Label>
              <Select value={formData.accommodation} onValueChange={(value) => handleInputChange("accommodation", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir l'hébergement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel-3">Hôtel 3 étoiles</SelectItem>
                  <SelectItem value="hotel-4">Hôtel 4 étoiles</SelectItem>
                  <SelectItem value="hotel-5">Hôtel 5 étoiles</SelectItem>
                  <SelectItem value="appartement">Appartement/Résidence</SelectItem>
                  <SelectItem value="aucun">Aucun hébergement nécessaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Budget and Project */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget estimé (€)</Label>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                placeholder="Montant estimé en euros"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectCode">Code projet / Centre de coût</Label>
              <Input
                id="projectCode"
                value={formData.projectCode}
                onChange={(e) => handleInputChange("projectCode", e.target.value)}
                placeholder="Code de facturation interne"
              />
            </div>
          </div>

          {/* Client Meeting */}
          <div className="space-y-4">
            <Label>Ce voyage inclut-il une rencontre client ?</Label>
            <RadioGroup
              value={formData.clientMeeting}
              onValueChange={(value) => handleInputChange("clientMeeting", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oui" id="client-oui" />
                <Label htmlFor="client-oui">Oui</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non" id="client-non" />
                <Label htmlFor="client-non">Non</Label>
              </div>
            </RadioGroup>
            
            {formData.clientMeeting === "oui" && (
              <div className="space-y-2">
                <Label htmlFor="clientName">Nom du client / partenaire</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange("clientName", e.target.value)}
                  placeholder="Nom de l'entreprise ou du contact"
                />
              </div>
            )}
          </div>

          {/* Urgency */}
          <div className="space-y-4">
            <Label>Niveau d'urgence</Label>
            <RadioGroup
              value={formData.urgency}
              onValueChange={(value) => handleInputChange("urgency", value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="urgency-normal" />
                <Label htmlFor="urgency-normal">Normal (2-3 semaines)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="urgent" id="urgency-urgent" />
                <Label htmlFor="urgency-urgent">Urgent (1 semaine)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tres-urgent" id="urgency-tres-urgent" />
                <Label htmlFor="urgency-tres-urgent">Très urgent (quelques jours)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments">Commentaires ou précisions</Label>
            <Textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => handleInputChange("comments", e.target.value)}
              placeholder="Informations additionnelles, contraintes particulières..."
              rows={3}
            />
          </div>

          {/* Travel Summary */}
          {(formData.startDate && formData.endDate && formData.destination) && (
            <Card className="bg-accent/50">
              <CardHeader>
                <CardTitle className="text-sm">Résumé du voyage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Destination:</span>
                    <span className="font-medium">{formData.destination}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Durée:</span>
                    <span className="font-medium">
                      {formData.startDate && formData.endDate ? 
                        `${Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 3600 * 24))} jour(s)` 
                        : '-'}
                    </span>
                  </div>
                  {formData.budget && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Budget estimé:</span>
                      <span className="font-medium">{formData.budget} €</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}