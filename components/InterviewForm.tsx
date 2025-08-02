"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";

interface InterviewFormProps {
  userId: string;
}

const InterviewForm = ({ userId }: InterviewFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    role: "",
    level: "",
    type: "",
    techstack: "",
    amount: 5,
    company: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/vapi/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userid: userId,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error creating interview:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    formData.company &&
    formData.role &&
    formData.level &&
    formData.type &&
    formData.techstack;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <p className="text-lg text-gray-600">
          Prepare for your dream job with AI-powered mock interviews tailored to
          top companies
        </p>
      </div>

      {/* Main Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Interview Configuration
          </CardTitle>
          <CardDescription>
            Configure your mock interview settings to match your target role and
            company
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="company" className="mb-3">
                  Target Company *
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, company: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Google"> Google</SelectItem>
                    <SelectItem value="Amazon"> Amazon</SelectItem>
                    <SelectItem value="Microsoft">Microsoft</SelectItem>
                    <SelectItem value="Meta"> Meta</SelectItem>
                    <SelectItem value="Apple"> Apple</SelectItem>
                    <SelectItem value="Netflix"> Netflix</SelectItem>
                    <SelectItem value="Tesla">Tesla</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="level" className="mb-3">
                  Experience Level *
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, level: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Junior">Junior (0-2 years)</SelectItem>
                    <SelectItem value="Mid">Mid-level (2-5 years)</SelectItem>
                    <SelectItem value="Senior"> Senior (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="role" className="mb-3">
                Job Role *
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select job role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Frontend Developer">
                    Frontend Developer
                  </SelectItem>
                  <SelectItem value="Backend Developer">
                    Backend Developer
                  </SelectItem>
                  <SelectItem value="Full Stack Developer">
                    Full Stack Developer
                  </SelectItem>
                  <SelectItem value="Product Manager">
                    Product Manager
                  </SelectItem>
                  <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                  <SelectItem value="UI/UX Designer">UI/UX Designer</SelectItem>
                  <SelectItem value="DevOps Engineer">
                    DevOps Engineer
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="type" className="mb-3">
                  Interview Type *
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical">💻 Technical</SelectItem>
                    <SelectItem value="Behavioral">🧠 Behavioral</SelectItem>
                    <SelectItem value="Mixed">🔄 Mixed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amount" className="mb-3">
                  Number of Questions *
                </Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, amount: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Questions (Quick)</SelectItem>
                    <SelectItem value="3">3 Questions (Quick)</SelectItem>
                    <SelectItem value="5">5 Questions (Standard)</SelectItem>
                    <SelectItem value="7">
                      7 Questions (Comprehensive)
                    </SelectItem>
                    <SelectItem value="10">10 Questions (Intensive)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="techstack" className="mb-3">
                Tech Stack *
              </Label>
              <Input
                id="techstack"
                value={formData.techstack}
                onChange={(e) =>
                  setFormData({ ...formData, techstack: e.target.value })
                }
                placeholder="e.g., React, Node.js, MongoDB, Python, AWS"
                required
                className="placeholder:text-gray-400"
              />
              <p className="text-sm text-gray-200 mt-1">
                Separate multiple technologies with commas
              </p>
            </div>

            {/* Preview Section */}
            {isFormValid && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Interview Preview:</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{formData.company}</Badge>
                  <Badge variant="outline">{formData.role}</Badge>
                  <Badge variant="outline">{formData.level}</Badge>
                  <Badge variant="outline">{formData.type}</Badge>
                  <Badge variant="outline">{formData.amount} Questions</Badge>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full h-12 text-lg"
            >
              {isLoading ? "Creating Interview..." : "Create Interview"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewForm;
