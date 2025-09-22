import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Save, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EthicsFormProps {
  onBack: () => void;
}

export default function EthicsForm({ onBack }: EthicsFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Header fields
    requester: "",
    requestDate: new Date().toISOString().split('T')[0],
    country: "",
    clientPartner: "",
    product: "",
    
    // Commercial context
    projectDescription: "",
    contractMode: "",
    commercialObjectives: "",
    strategicImportance: "",
    opportunityContext: "",
    
    // Ethics analysis
    surveillanceRisk: "",
    surveillanceDetails: "",
    personalData: "",
    personalDataDetails: "",
    deployment: "",
    deploymentDetails: "",
    regulations: "",
    regulationsDetails: "",
    legalConstraints: "",
    legalConstraintsDetails: "",
    misuseRisk: "",
    misuseDetails: "",
    ethicalClauses: "",
    ethicalClausesDetails: "",
    
    // Summary
    riskLevel: "",
    recommendation: "",
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
    // Basic validation
    if (!formData.requester || !formData.country || !formData.clientPartner) {
      toast({
        title: "Champs requis manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Demande soumise",
      description: "Votre demande de comité éthique a été soumise avec succès.",
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
          <h1 className="text-2xl font-bold">Demande de Comité Éthique</h1>
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
          <CardTitle className="text-center">DEMANDE DE COMITÉ ÉTHIQUE</CardTitle>
          <div className="flex justify-center">
            <div className="text-2xl">• • •</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="requester">Demandeur (NOM, Prénom, Fonction) *</Label>
              <Input
                id="requester"
                value={formData.requester}
                onChange={(e) => handleInputChange("requester", e.target.value)}
                placeholder="Nom Prénom, Fonction"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requestDate">Date de la demande</Label>
              <Input
                id="requestDate"
                type="date"
                value={formData.requestDate}
                onChange={(e) => handleInputChange("requestDate", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Pays concerné *</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                placeholder="Pays"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientPartner">Client / Partenaire *</Label>
              <Input
                id="clientPartner"
                value={formData.clientPartner}
                onChange={(e) => handleInputChange("clientPartner", e.target.value)}
                placeholder="Numéro OSI ou nom de l'entreprise"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="product">Produit concerné</Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) => handleInputChange("product", e.target.value)}
                placeholder="Nom du produit"
              />
            </div>
          </div>

          <Separator />

          {/* 1. Commercial Context */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">1. Contexte commercial</h2>
            
            <div className="space-y-2">
              <Label htmlFor="projectDescription">1.1. Brève description du projet</Label>
              <Textarea
                id="projectDescription"
                value={formData.projectDescription}
                onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                placeholder="Produit, client, marché, rencontre(s) passée(s) et à venir"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contractMode">1.2. Mode de contractualisation</Label>
              <Textarea
                id="contractMode"
                value={formData.contractMode}
                onChange={(e) => handleInputChange("contractMode", e.target.value)}
                placeholder="Direct et/ou intermédiaire français ou locaux"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commercialObjectives">1.3. Objectifs commerciaux</Label>
              <Textarea
                id="commercialObjectives"
                value={formData.commercialObjectives}
                onChange={(e) => handleInputChange("commercialObjectives", e.target.value)}
                placeholder="À quelle phase de la relation commerciale l'entreprise est engagée et dans quelle échéancier"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="strategicImportance">1.4. Importance stratégique</Label>
              <Textarea
                id="strategicImportance"
                value={formData.strategicImportance}
                onChange={(e) => handleInputChange("strategicImportance", e.target.value)}
                placeholder="Chiffre d'affaires estimé, ouverture marché, partenariat clé"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="opportunityContext">1.5. Contexte de l'opportunité et lieu de rencontre</Label>
              <Textarea
                id="opportunityContext"
                value={formData.opportunityContext}
                onChange={(e) => handleInputChange("opportunityContext", e.target.value)}
                placeholder="Salon, démarchage, recommandation, intermédiaire"
                rows={4}
              />
            </div>
          </div>

          <Separator />

          {/* 2. Ethics Analysis */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">2. Analyse éthique initiale par le demandeur</h2>
            
            <h3 className="text-lg font-medium text-primary">Droits humains et usages potentiels</h3>
            
            <div className="space-y-4">
              <Label>2.1. L'outil pourrait-il être utilisé pour de la surveillance, de la censure ou des discriminations ?</Label>
              <RadioGroup
                value={formData.surveillanceRisk}
                onValueChange={(value) => handleInputChange("surveillanceRisk", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="surveillance-oui" />
                  <Label htmlFor="surveillance-oui">Oui</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="surveillance-non" />
                  <Label htmlFor="surveillance-non">Non</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="incertain" id="surveillance-incertain" />
                  <Label htmlFor="surveillance-incertain">Incertain</Label>
                </div>
              </RadioGroup>
              <Textarea
                value={formData.surveillanceDetails}
                onChange={(e) => handleInputChange("surveillanceDetails", e.target.value)}
                placeholder="Détaillez si vous disposez d'éléments complémentaires"
                rows={3}
              />
            </div>

            <h3 className="text-lg font-medium text-primary">Données et cybersécurité</h3>

            <div className="space-y-4">
              <Label>2.2. Des données personnelles seront-elles collectées, stockées ou transférées à l'international ?</Label>
              <RadioGroup
                value={formData.personalData}
                onValueChange={(value) => handleInputChange("personalData", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="data-oui" />
                  <Label htmlFor="data-oui">Oui</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="data-non" />
                  <Label htmlFor="data-non">Non</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="incertain" id="data-incertain" />
                  <Label htmlFor="data-incertain">Incertain</Label>
                </div>
              </RadioGroup>
              <Textarea
                value={formData.personalDataDetails}
                onChange={(e) => handleInputChange("personalDataDetails", e.target.value)}
                placeholder="Détaillez si vous disposez d'éléments complémentaires"
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <Label>2.3. Comment envisage-t-on de déployer le logiciel ?</Label>
              <RadioGroup
                value={formData.deployment}
                onValueChange={(value) => handleInputChange("deployment", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="saas" id="deploy-saas" />
                  <Label htmlFor="deploy-saas">SaaS</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="onpremise" id="deploy-onpremise" />
                  <Label htmlFor="deploy-onpremise">On-Premise</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="incertain" id="deploy-incertain" />
                  <Label htmlFor="deploy-incertain">Incertain</Label>
                </div>
              </RadioGroup>
              <Textarea
                value={formData.deploymentDetails}
                onChange={(e) => handleInputChange("deploymentDetails", e.target.value)}
                placeholder="Détaillez si vous disposez d'éléments complémentaires"
                rows={3}
              />
            </div>

            {/* Continue with remaining fields... */}
            <div className="space-y-4">
              <Label>2.4. Le pays d'export a-t-il une réglementation compatible avec nos standards (ex. RGPD) ?</Label>
              <RadioGroup
                value={formData.regulations}
                onValueChange={(value) => handleInputChange("regulations", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="reg-oui" />
                  <Label htmlFor="reg-oui">Oui</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="reg-non" />
                  <Label htmlFor="reg-non">Non</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="incertain" id="reg-incertain" />
                  <Label htmlFor="reg-incertain">Incertain</Label>
                </div>
              </RadioGroup>
              <Textarea
                value={formData.regulationsDetails}
                onChange={(e) => handleInputChange("regulationsDetails", e.target.value)}
                placeholder="Détaillez si vous disposez d'éléments complémentaires"
                rows={3}
              />
            </div>

            <h3 className="text-lg font-medium text-primary">Conformité légale</h3>

            <div className="space-y-4">
              <Label>2.5. Existe-t-il des contraintes légales particulières ?</Label>
              <Textarea
                value={formData.legalConstraints}
                onChange={(e) => handleInputChange("legalConstraints", e.target.value)}
                placeholder="Ex. obligation de backdoor, censure, embargo, export control"
                rows={3}
              />
            </div>

            <h3 className="text-lg font-medium text-primary">Usage détourné et responsabilité</h3>

            <div className="space-y-4">
              <Label>2.6. Existe-t-il un risque d'usage détourné du logiciel à des fins nuisibles ?</Label>
              <RadioGroup
                value={formData.misuseRisk}
                onValueChange={(value) => handleInputChange("misuseRisk", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="misuse-oui" />
                  <Label htmlFor="misuse-oui">Oui</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="misuse-non" />
                  <Label htmlFor="misuse-non">Non</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="incertain" id="misuse-incertain" />
                  <Label htmlFor="misuse-incertain">Incertain</Label>
                </div>
              </RadioGroup>
              <Textarea
                value={formData.misuseDetails}
                onChange={(e) => handleInputChange("misuseDetails", e.target.value)}
                placeholder="Ex. cyberattaques, désinformation"
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <Label>2.7. Des clauses contractuelles éthiques sont-elles prévues ?</Label>
              <RadioGroup
                value={formData.ethicalClauses}
                onValueChange={(value) => handleInputChange("ethicalClauses", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="oui" id="clauses-oui" />
                  <Label htmlFor="clauses-oui">Oui</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="non" id="clauses-non" />
                  <Label htmlFor="clauses-non">Non</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="incertain" id="clauses-incertain" />
                  <Label htmlFor="clauses-incertain">Incertain</Label>
                </div>
              </RadioGroup>
              <Textarea
                value={formData.ethicalClausesDetails}
                onChange={(e) => handleInputChange("ethicalClausesDetails", e.target.value)}
                placeholder="Détaillez si vous disposez d'éléments complémentaires"
                rows={3}
              />
            </div>
          </div>

          <Separator />

          {/* 3. Summary */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">3. Synthèse du demandeur</h2>
            
            <div className="space-y-4">
              <Label>Évaluation globale des risques éthiques (selon jugement du demandeur) :</Label>
              <RadioGroup
                value={formData.riskLevel}
                onValueChange={(value) => handleInputChange("riskLevel", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="faible" id="risk-faible" />
                  <Label htmlFor="risk-faible">Faible</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moyen" id="risk-moyen" />
                  <Label htmlFor="risk-moyen">Moyen</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="eleve" id="risk-eleve" />
                  <Label htmlFor="risk-eleve">Élevé</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="recommendation">Recommandation du demandeur :</Label>
              <Textarea
                id="recommendation"
                value={formData.recommendation}
                onChange={(e) => handleInputChange("recommendation", e.target.value)}
                placeholder="Votre recommandation"
                rows={4}
              />
            </div>
          </div>

          <Separator />

          {/* 4. Committee Decision */}
          <div className="space-y-6 bg-muted/30 p-6 rounded-lg">
            <h2 className="text-xl font-semibold">4. Décision du Comité Éthique</h2>
            <p className="text-sm text-muted-foreground italic">
              (À remplir par le Comité éthique)
            </p>
            
            <div className="space-y-4 opacity-60">
              <Label>Avis du Comité :</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" disabled />
                  <Label>Accordé</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" disabled />
                  <Label>Accordé avec conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" disabled />
                  <Label>Refusé</Label>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Commentaires / Conditions éventuelles :</Label>
                <Textarea disabled rows={4} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date :</Label>
                  <Input disabled />
                </div>
                <div className="space-y-2">
                  <Label>Signature du Comité :</Label>
                  <Input disabled />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}